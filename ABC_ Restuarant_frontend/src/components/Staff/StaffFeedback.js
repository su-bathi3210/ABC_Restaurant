import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import './Staff.css';

Modal.setAppElement('#root');

const StaffFeedback = () => {
    const [feedbackList, setFeedbackList] = useState([]);
    const [response, setResponse] = useState('');
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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

    const submitResponse = async () => {
        try {
            if (isEditing) {
                await axios.put(`/feedback/${selectedFeedback}`, { staffResponse: response });
            } else {
                await axios.post(`/feedback/${selectedFeedback}`, { staffResponse: response });
            }
            Swal.fire({
                title: 'Success!',
                text: 'Response submitted successfully!',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false
            });
            setResponse('');
            setSelectedFeedback(null);
            setIsEditing(false);
            setIsModalOpen(false);
            fetchFeedbacks();
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

    const openModal = (feedback) => {
        setSelectedFeedback(feedback.feedbackId);
        setResponse(feedback.staffResponse || '');
        setIsEditing(!!feedback.staffResponse);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setResponse('');
        setIsEditing(false);
    };

    return (
        <div className="staff-container mt-5">
            <h1 className="staff-form-head">Feedback Manage</h1>
            <p className="staff-contact-paragraph" data-aos="fade-down">
                At ABC Restaurant, staff members can efficiently manage customer feedback through our dedicated admin feedback management system. By actively managing feedback, our team can maintain high standards of service, continuously improve the dining experience, and foster strong relationships with our valued customers.
            </p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
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
                                <button className="btn btn-primary" 
                                style={{ backgroundColor: 'tomato', color: 'white', width: '90px' }}
                                onClick={() => openModal(feedback)}>
                                    {feedback.staffResponse ? 'Edit Response' : 'Respond'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Respond to Feedback"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>{isEditing ? 'Edit Response' : 'Respond to Feedback'}</h2>
                <textarea
                    className="form-control"
                    rows="4"
                    value={response}
                    onChange={handleResponseChange}
                    placeholder="Enter your response..."
                ></textarea>
                <button
                    className="btn btn-success mt-3"
                    onClick={submitResponse}
                >
                    {isEditing ? 'Update Response' : 'Submit Response'}
                </button>
                <button className="btn btn-secondary mt-3" onClick={closeModal}>Cancel</button>
            </Modal>

            <footer className="admin-about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default StaffFeedback;
