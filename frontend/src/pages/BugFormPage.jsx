import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import api from '../api';
import { useToast } from '../context/ToastContext';

const BugFormPage = () => {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const navigate = useNavigate();
    const { addToast } = useToast();

    const [topic, setTopic] = useState('');
    const [language, setLanguage] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [errorText, setErrorText] = useState('');
    const [solutionText, setSolutionText] = useState('');
    const [stackTrace, setStackTrace] = useState('');

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(isEdit);

    useEffect(() => {
        if (isEdit) {
            const fetchBug = async () => {
                try {
                    const response = await api.get(`/errors/get_error/${id}`);
                    const bug = response.data;
                    setTopic(bug.topic);
                    setLanguage(bug.programmingLanguage);
                    setTagsInput(bug.tagNames ? bug.tagNames.join(', ') : '');
                    setErrorText(bug.errorText);
                    setSolutionText(bug.solutionText || '');
                    setStackTrace(bug.errorStackTrace || '');
                } catch (error) {
                    addToast('Failed to load bug data', 'error');
                    navigate('/');
                } finally {
                    setInitialLoading(false);
                }
            };
            fetchBug();
        }
    }, [id, isEdit, navigate, addToast]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!topic || !language || !errorText || !solutionText) {
            addToast('Topic, Language, Error Text, and Solution Text are required.', 'error');
            return;
        }

        setLoading(true);
        const tagList = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
        const payload = {
            topic,
            programmingLanguage: language,
            tagNames: tagList,
            tags: tagsInput,
            errorText,
            solutionText,
            errorStackTrace: stackTrace
        };

        try {
            if (isEdit) {
                await api.put(`/errors/update_error/${id}`, payload);
                addToast('Bug configuration updated', 'success');
            } else {
                await api.post('/errors/add_error', payload);
                addToast('New bug entry committed', 'success');
            }
            navigate('/');
        } catch (error) {
            addToast(error.response?.data?.message || 'Transaction failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return <div style={{ color: 'var(--text-secondary)' }}>Loading registry data...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'transparent', border: '1px solid var(--border-color)', padding: '0.4rem', color: 'var(--text-secondary)' }}>
                    <ArrowLeft size={20} />
                </button>
                <h1 style={{ margin: 0, fontWeight: 600, fontSize: '1.5rem' }}>{isEdit ? 'Reconfigure Entry' : 'Initialize Entry'}</h1>
            </div>

            <div className="card">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 300px' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Topic *</label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g. NullPointerException in UserService"
                                required
                            />
                        </div>
                        <div style={{ flex: '1 1 200px' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Language *</label>
                            <input
                                type="text"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                placeholder="e.g. Java, TypeScript"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Tags (comma separated)</label>
                        <input
                            type="text"
                            value={tagsInput}
                            onChange={(e) => setTagsInput(e.target.value)}
                            placeholder="e.g. auth, api, urgent"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Error Text / Context *</label>
                        <textarea
                            className="code-font"
                            value={errorText}
                            onChange={(e) => setErrorText(e.target.value)}
                            rows={6}
                            placeholder="Paste the error message or describe the issue..."
                            required
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Stack Trace (Optional)</label>
                        <textarea
                            className="code-font"
                            value={stackTrace}
                            onChange={(e) => setStackTrace(e.target.value)}
                            rows={4}
                            placeholder="Paste relevant stack trace here..."
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Solution Configuration</label>
                        <textarea
                            className="code-font"
                            value={solutionText}
                            onChange={(e) => setSolutionText(e.target.value)}
                            rows={6}
                            placeholder="Describe the solution or workaround..."
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="submit" className="primary" disabled={loading}>
                            {loading ? 'Processing...' : isEdit ? 'Commit Changes' : 'Execute Initializer'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BugFormPage;
