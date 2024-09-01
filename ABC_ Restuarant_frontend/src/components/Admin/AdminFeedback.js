import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AOS from 'aos';
import ReactStars from 'react-stars';

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        AOS.init({ duration: 2000 });
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('/feedback');
            setFeedbacks(response.data);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const deleteFeedback = async (feedbackId) => {
        try {
            await axios.delete(`/feedback/${feedbackId}`);
            Swal.fire({
                title: 'Deleted!',
                text: 'Feedback has been deleted.',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false
            });
            fetchFeedbacks();
        } catch (error) {
            console.error('Error deleting feedback:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error deleting feedback',
                icon: 'error',
                timer: 2500,
                showConfirmButton: false
            });
        }
    };

    return (
        <div className="feedback-container mt-5" data-aos="fade-up">
            <h1 className="feedback-form-head">Feedback</h1>
            <p className="contact-paragraph" data-aos="fade-down">The Feedback Management system at ABC Restaurant allows administrators to efficiently oversee customer feedback, ensuring every comment is reviewed and addressed promptly. With this tool, admins can easily manage feedback entries, assess ratings, respond to customer concerns, and maintain high service standards. </p>

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Subject</th>
                            <th>Message</th>
                            <th>Rating</th>
                            <th>Staff Response</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedbacks.map((feedback) => (
                            <tr key={feedback.feedbackId}>
                                <td>{feedback.name}</td>
                                <td>{feedback.email}</td>
                                <td>{feedback.phoneNumber}</td>
                                <td>{feedback.subject}</td>
                                <td>{feedback.message}</td>
                                <td>

                                    <ReactStars
                                        count={5}
                                        value={feedback.rating}
                                        size={24}
                                        color2={'#ffd700'}
                                        edit={false}
                                    />
                                </td>
                                <td>{feedback.staffResponse}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteFeedback(feedback.feedbackId)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <footer className="admin-about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default AdminFeedback;
