import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './Admin.css'

// Ensure you call this to set the app element for accessibility
Modal.setAppElement('#root');

const AdminQuery = () => {
    const [queries, setQueries] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);

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
        setModalIsOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/query/${id}`);
            setQueries(queries.filter(query => query.id !== id));
            setSuccess('Query deleted successfully.');
        } catch (error) {
            setError('Failed to delete the query.');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!selectedQuery) return;

        try {
            const response = await axios.put(`/api/query/${selectedQuery.id}`, selectedQuery);
            setQueries(queries.map(query => query.id === selectedQuery.id ? response.data : query));
            setSuccess('Query updated successfully.');
            setModalIsOpen(false);
            setSelectedQuery(null);
        } catch (error) {
            setError('Failed to update the query.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedQuery({ ...selectedQuery, [name]: value });
    };

    return (
        <div className="admin-query-container">
            <h2>Query</h2>
            <p>At ABC Restaurant, our admin panel provides a streamlined interface for efficiently managing customer queries. This feature ensures that customer concerns are addressed promptly and effectively, enhancing the overall customer experience at ABC Restaurant.</p>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <table className="query-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Status</th>
                        <th>Respond</th>
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
                            <td>{query.status}</td>
                            <td>{query.respond}</td>
                            <td>
                                <button
                                    style={{ backgroundColor: '#600000', color: 'white', width: '50px' }}
                                    onClick={() => handleEditClick(query)}>Edit</button>

                                <button
                                    style={{ backgroundColor: 'tomato', color: 'white', width: '70px' }}
                                    onClick={() => handleDelete(query.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedQuery && (
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={() => setModalIsOpen(false)}
                    contentLabel="Edit Query"
                    className="modal"
                    overlayClassName="overlay"
                >
                    <h3>Edit Query</h3>
                    <form onSubmit={handleUpdate} className="edit-query-form">
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={selectedQuery.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={selectedQuery.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={selectedQuery.subject}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                id="message"
                                name="message"
                                value={selectedQuery.message}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                id="respond"
                                name="respond"
                                value={selectedQuery.respond}
                                onChange={handleInputChange}
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
                        <button type="button" onClick={() => setModalIsOpen(false)}>Cancel</button>
                    </form>
                </Modal>
            )}

            <footer className="admin-about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default AdminQuery;
