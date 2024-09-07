import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Staff.css'; // Make sure to import the CSS file

const StaffQuery = () => {
    const [queries, setQueries] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Fetch all queries on component mount
        const fetchQueries = async () => {
            try {
                const response = await axios.get('/api/query');
                setQueries(response.data);
            } catch (error) {
                setError('Failed to fetch queries.');
            }
        };
        fetchQueries();
    }, []);

    const handleEditClick = (query) => {
        setSelectedQuery(query);
        setIsModalOpen(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!selectedQuery) return;

        // Update the status and response before sending
        const updatedQuery = {
            ...selectedQuery,
            status: 'done', // Mark as done to trigger email sending
        };

        try {
            const response = await axios.put(`/api/query/${selectedQuery.id}`, updatedQuery);
            setQueries(queries.map(query => query.id === selectedQuery.id ? response.data : query));
            setSuccess('Query updated successfully.');
            setIsModalOpen(false);
            setSelectedQuery(null);
        } catch (error) {
            setError('Failed to update the query.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedQuery({ ...selectedQuery, [name]: value });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedQuery(null);
    };

    return (
        <div className="staff-query-container">
            <h2>Query Manage</h2>
            <p>At ABC Restaurant, our dedicated staff are trained to effectively manage and resolve all customer queries with professionalism and efficiency. When a query is received, our team promptly acknowledges it and ensures that every concern is addressed thoroughly.</p>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <table className="query-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Respond</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {queries.map((query) => (
                        <tr key={query.id}>
                            <td>{query.name}</td>
                            <td>{query.email}</td>
                            <td>{query.subject}</td>
                            <td>{query.message}</td>
                            <td>{query.respond}</td>
                            <td>{query.status}</td>
                            <td>
                                <button
                                    style={{ backgroundColor: 'tomato', color: 'white', width: '60px' }}
                                    onClick={() => handleEditClick(query)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for editing a query */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Edit Query</h3>
                        <form onSubmit={handleUpdate} className="edit-query-form">

                            <div className="form-group">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={selectedQuery.name}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={selectedQuery.email}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={selectedQuery.subject}
                                    onChange={handleInputChange}
                                    readOnly
                                />
                            </div>

                            <div className="form-group">
                                <textarea
                                    id="message"
                                    name="message"
                                    value={selectedQuery.message}
                                    onChange={handleInputChange}
                                    readOnly
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    id="respond"
                                    name="respond"
                                    value={selectedQuery.respond}
                                    onChange={handleInputChange}
                                    placeholder="Response"
                                />
                            </div>

                            <div className="form-group">
                                <select
                                    id="status"
                                    name="status"
                                    value={selectedQuery.status}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>

                            <button type="submit">Update Query</button>
                            <button type="button" onClick={closeModal}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            <footer className="admin-about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default StaffQuery;
