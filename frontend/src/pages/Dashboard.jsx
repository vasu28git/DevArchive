import React, { useEffect, useState } from 'react';
import { Search, Loader } from 'lucide-react';
import api from '../api';
import BugCard from '../components/BugCard';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTopic, setSearchTopic] = useState('');
    const [searchLanguage, setSearchLanguage] = useState('');
    const [searchTag, setSearchTag] = useState('');
    const { addToast } = useToast();

    const fetchBugs = async () => {
        setLoading(true);
        try {
            const response = await api.get('/errors/get_errors');
            setBugs(response.data);
        } catch (error) {
            addToast('Failed to load bugs. Ensure backend is running.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBugs();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/errors/delete_error/${id}`);
            addToast('Bug deleted successfully', 'success');
            setBugs(bugs.filter(b => b.bugId !== id));
        } catch (error) {
            addToast('Failed to delete bug', 'error');
        }
    };

    const filteredBugs = bugs.filter(bug => {
        const matchTopic = bug.topic.toLowerCase().includes(searchTopic.toLowerCase());
        const matchLanguage = bug.programmingLanguage.toLowerCase().includes(searchLanguage.toLowerCase());
        const matchTag = searchTag === '' || bug.tagNames?.some(t => t.toLowerCase().includes(searchTag.toLowerCase()));
        return matchTopic && matchLanguage && matchTag;
    });

    const clearFilters = () => {
        setSearchTopic('');
        setSearchLanguage('');
        setSearchTag('');
    };

    return (
        <div>
            <h1 style={{ marginBottom: '1.5rem', fontWeight: 600, fontSize: '1.5rem' }}>Knowledge Base</h1>

            <div className="card" style={{ marginBottom: '2rem', padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                    <div style={{ flex: '1 1 200px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Topic</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Search topic..."
                                value={searchTopic}
                                onChange={(e) => setSearchTopic(e.target.value)}
                                style={{ paddingLeft: '2rem' }}
                            />
                            <Search size={16} style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                        </div>
                    </div>
                    <div style={{ flex: '1 1 200px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Language</label>
                        <input
                            type="text"
                            placeholder="e.g. Java, Python"
                            value={searchLanguage}
                            onChange={(e) => setSearchLanguage(e.target.value)}
                        />
                    </div>
                    <div style={{ flex: '1 1 150px' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Tag</label>
                        <input
                            type="text"
                            placeholder="Filter by tag..."
                            value={searchTag}
                            onChange={(e) => setSearchTag(e.target.value)}
                        />
                    </div>
                    {(searchTopic || searchLanguage || searchTag) && (
                        <button onClick={clearFilters} style={{ height: '38px' }}>
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <Loader size={32} className="lucide-spin" style={{ animation: 'spin 1s linear infinite' }} />
                    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                    <span style={{ marginLeft: '1rem' }}>Loading memory core...</span>
                </div>
            ) : filteredBugs.length > 0 ? (
                <div>
                    {filteredBugs.map(bug => (
                        <BugCard key={bug.bugId} bug={bug} onDelete={handleDelete} />
                    ))}
                </div>
            ) : (
                <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                    <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No entries found</div>
                    <p>The query returned zero records. Try adjusting your filters or initialize a new record.</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;