import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from './supabaseClient';

function ReportDetails() {
    const { id } = useParams();
    const [report, setReport] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Fetch report and comments
    useEffect(() => {
        fetchReport();
        fetchComments();
    }, [id]);

    const fetchReport = async () => {
        const { data, error } = await supabase
            .from('reports')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching report:', error.message);
        } else {
            setReport(data);
        }
    };

    const fetchComments = async () => {
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('report_id', id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching comments:', error.message);
        } else {
            setComments(data);
        }
    };

    const addComment = async () => {
        if (!newComment.trim()) return;

        const { error } = await supabase.from('comments').insert([
            { report_id: id, text: newComment },
        ]);

        if (error) {
            console.error('Error inserting comment:', error.message);
        } else {
            setNewComment('');
            await fetchComments(); // ✅ Update the list after adding
        }
    };

    if (!report) return <p>Loading report details...</p>;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>{report.title || 'No Title'}</h2>
            {report.image_url && (
                <img
                    src={report.image_url}
                    alt="Garbage"
                    style={{ width: '100%', marginBottom: '10px' }}
                />
            )}
            <p><strong>Location:</strong> {report.location || 'N/A'}</p>
            <p><strong>Latitude:</strong> {report.lat}</p>
            <p><strong>Longitude:</strong> {report.lng}</p>

            <hr style={{ margin: '20px 0' }} />

            <h3>Comments</h3>
            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id} style={{ marginBottom: '8px' }}>
                            {comment.text}
                        </li>
                    ))}
                </ul>
            )}

            <div style={{ marginTop: '20px' }}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    rows="3"
                    style={{ width: '100%', padding: '10px' }}
                />
                <button
                    onClick={addComment}
                    style={{
                        marginTop: '10px',
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Post
                </button>
            </div>
        </div>
    );
}

export default ReportDetails;
