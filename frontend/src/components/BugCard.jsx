import React, { useState } from 'react';
import { Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const BugCard = ({ bug, onDelete }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="card" style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: 600 }}>{bug.topic}</h3>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span className="badge" style={{ borderColor: 'var(--text-accent)', color: 'var(--text-accent)' }}>
                            {bug.programmingLanguage}
                        </span>
                        {bug.tagNames && bug.tagNames.map(tag => (
                            <span key={tag} className="badge">{tag}</span>
                        ))}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Link to={`/edit/${bug.bugId}`} style={{
                        display: 'inline-flex',
                        padding: '0.5rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'var(--text-secondary)',
                        textDecoration: 'none'
                    }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--text-secondary)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                    >
                        <Edit2 size={16} />
                    </Link>
                    <button
                        className="danger"
                        style={{ padding: '0.4rem 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this bug?')) {
                                onDelete(bug.bugId);
                            }
                        }}
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div onClick={() => setIsExpanded(!isExpanded)} style={{ cursor: 'pointer', marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        {isExpanded ? 'Full Error Details:' : 'Error Preview:'}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', marginRight: '0.25rem' }}>{isExpanded ? 'Show less' : 'Show more'}</span>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                </div>
                <pre style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.875rem',
                    backgroundColor: 'var(--bg-primary)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    overflowX: 'auto',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-all'
                }}>
                    {isExpanded ? bug.errorText : (bug.errorText?.length > 150 ? bug.errorText.substring(0, 150) + '...' : bug.errorText)}
                </pre>

                {isExpanded && bug.solutionText && (
                    <div style={{ marginTop: '1rem' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Solution:</div>
                        <pre style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.875rem',
                            backgroundColor: 'var(--bg-primary)',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-color)',
                            overflowX: 'auto',
                            margin: 0,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-all'
                        }}>
                            {bug.solutionText}
                        </pre>
                    </div>
                )}

                {isExpanded && bug.errorStackTrace && (
                    <div style={{ marginTop: '1rem' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Stack Trace:</div>
                        <pre style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.875rem',
                            backgroundColor: 'var(--bg-primary)',
                            padding: '0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-color)',
                            overflowX: 'auto',
                            margin: 0,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-all'
                        }}>
                            {bug.errorStackTrace}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BugCard;
