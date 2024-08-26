import React, { useState, useEffect } from 'react';

const AdminFeedback= () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [editFeedback, setEditFeedback] = useState(null);
    const [updatedFeedback, setUpdatedFeedback] = useState({});

    useEffect(() => {
        // Fetch all feedbacks when the component loads
        const fetchFeedbacks = async () => {
            const response = await fetch('/feedback');
            const data = await response.json();
            setFeedbacks(data);
        };

        fetchFeedbacks();
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
        } else {
            console.error('Failed to delete feedback');
        }
    };

    const handleEdit = (feedback) => {
        setEditFeedback(feedback);
        setUpdatedFeedback({ ...feedback });
    };

    const handleUpdate = async (id) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFeedback),
        });

        if (response.ok) {
            setFeedbacks(feedbacks.map(fb => (fb.id === id ? updatedFeedback : fb)));
            setEditFeedback(null);
        } else {
            console.error('Failed to update feedback');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedFeedback(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="admin-feedback-panel">
            <h1>Admin Feedback Panel</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbacks.map(feedback => (
                        <tr key={feedback.id}>
                            <td>{feedback.name}</td>
                            <td>{feedback.email}</td>
                            <td>{feedback.phoneNumber}</td>
                            <td>{feedback.subject}</td>
                            <td>{feedback.message}</td>
                            <td>
                                <button onClick={() => handleEdit(feedback)}>Edit</button>
                                <button onClick={() => handleDelete(feedback.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editFeedback && (
                <div className="edit-feedback-form">
                    <h2>Edit Feedback</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(editFeedback.id);
                    }}>
                        <input
                            type="text"
                            name="name"
                            value={updatedFeedback.name}
                            onChange={handleChange}
                            placeholder="Enter name"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={updatedFeedback.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                        />
                        <input
                            type="text"
                            name="phoneNumber"
                            value={updatedFeedback.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            required
                        />
                        <input
                            type="text"
                            name="subject"
                            value={updatedFeedback.subject}
                            onChange={handleChange}
                            placeholder="Enter subject"
                            required
                        />
                        <textarea
                            name="message"
                            value={updatedFeedback.message}
                            onChange={handleChange}
                            placeholder="Enter message"
                            required
                        />
                        <button type="submit">Update Feedback</button>
                        <button onClick={() => setEditFeedback(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminFeedback;
