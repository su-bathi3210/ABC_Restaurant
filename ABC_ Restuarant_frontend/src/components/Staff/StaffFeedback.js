import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const StaffFeedback = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [response, setResponse] = useState('');
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('/feedback');
            setFeedbackList(response.data);
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    };

    const handleResponseChange = (e) => {
        setResponse(e.target.value);
    };

    const submitResponse = async (feedbackId) => {
        try {
            await axios.put(`/feedback/${feedbackId}`, { staffResponse: response });
            Swal.fire({
                title: 'Success!',
                text: 'Response submitted successfully!',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false
            });
            setResponse('');
            setSelectedFeedback(null);
            fetchFeedbacks(); // Refresh the feedback list
        } catch (error) {
            console.error('Error submitting response:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error submitting response',
                icon: 'error',
                timer: 2500,
                showConfirmButton: false
            });
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="form-head">Staff Feedback Management</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Rating</th>
                        <th>Response</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {feedbackList.map(feedback => (
                        <tr key={feedback.feedbackId}>
                            <td>{feedback.name}</td>
                            <td>{feedback.email}</td>
                            <td>{feedback.phoneNumber}</td>
                            <td>{feedback.subject}</td>
                            <td>{feedback.message}</td>
                            <td>{feedback.rating}</td>
                            <td>{feedback.staffResponse}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => setSelectedFeedback(feedback.feedbackId)}>
                                    Respond
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedFeedback && (
                <div className="mt-4">
                    <h3>Respond to Feedback</h3>
                    <textarea
                        className="form-control"
                        rows="4"
                        value={response}
                        onChange={handleResponseChange}
                        placeholder="Enter your response..."
                    ></textarea>
                    <button
                        className="btn btn-success mt-3"
                        onClick={() => submitResponse(selectedFeedback)}
                    >
                        Submit Response
                    </button>
                </div>
            )}
        </div>
    );
};

export default StaffFeedback;
