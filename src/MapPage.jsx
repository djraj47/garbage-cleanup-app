import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapPage.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png'
});

export default function MapPage() {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        async function fetchReports() {
            const { data, error } = await supabase.from('reports').select('*');
            if (!error) setReports(data);
        }
        fetchReports();
    }, []);

    useEffect(() => {
        async function fetchComments() {
            if (!selectedReport) return;
            const { data } = await supabase
                .from('comments')
                .select('*')
                .eq('report_id', selectedReport.id)
                .order('created_at', { ascending: false });
            setComments(data || []);
        }
        fetchComments();
    }, [selectedReport]);

    const addComment = async () => {
        if (!newComment.trim()) return;
        await supabase.from('comments').insert([
            { report_id: selectedReport.id, text: newComment }
        ]);
        setNewComment('');
        const { data } = await supabase
            .from('comments')
            .select('*')
            .eq('report_id', selectedReport.id)
            .order('created_at', { ascending: false });
        setComments(data || []);
    };

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                scrollWheelZoom={true}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap contributors"
                />

                {reports
                    .filter(report => report.lat != null && report.lng != null)
                    .map((report) => (
                        <Marker
                            key={report.id}
                            position={[report.lat, report.lng]}
                            eventHandlers={{
                                click: () => setSelectedReport(report)
                            }}
                        >
                            <Popup>{report.title}</Popup>
                        </Marker>
                    ))}
            </MapContainer>

            {selectedReport && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: '350px',
                        height: '100%',
                        backgroundColor: 'white',
                        borderLeft: '1px solid #ccc',
                        padding: '15px',
                        overflowY: 'auto',
                        zIndex: 1000
                    }}
                >
                    <button
                        onClick={() => setSelectedReport(null)}
                        style={{
                            float: 'right',
                            background: 'transparent',
                            border: 'none',
                            fontSize: '18px',
                            cursor: 'pointer'
                        }}
                    >
                        ✖
                    </button>
                    <h3>{selectedReport.title}</h3>
                    <img
                        src={selectedReport.image_url}
                        alt={selectedReport.title}
                        style={{
                            width: '100%',
                            borderRadius: '8px',
                            marginBottom: '10px'
                        }}
                    />
                    <p><strong>Location:</strong> {selectedReport.location}</p>
                    <hr />
                    <h4>Comments</h4>
                    {comments.length === 0 && <p>No comments yet.</p>}
                    {comments.map((c) => (
                        <p key={c.id} style={{ marginBottom: '6px' }}>🗨 {c.text}</p>
                    ))}
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment"
                        style={{
                            width: '100%',
                            padding: '8px',
                            marginTop: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    />
                    <button
                        onClick={addComment}
                        style={{
                            marginTop: '8px',
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#27ae60',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Post
                    </button>
                </div>
            )}
        </div>
    );
}
