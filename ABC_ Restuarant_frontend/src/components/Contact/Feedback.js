import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import AOS from 'aos';

const Feedback = () => {
    const [feedback, setFeedback] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});

    // Correctly importing and using useEffect to initialize AOS
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    const validate = () => {
        const errors = {};
        if (!feedback.name) errors.name = "Name is required";
        if (!feedback.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(feedback.email)) {
            errors.email = "Email is invalid";
        }
        if (!feedback.phoneNumber) {
            errors.phoneNumber = "Phone number is required";
        } else if (!/^\d+$/.test(feedback.phoneNumber)) {
            errors.phoneNumber = "Phone number must be digits only";
        }
        if (!feedback.subject) errors.subject = "Subject is required";
        if (!feedback.message) errors.message = "Message is required";
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedback({ ...feedback, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            axios.post('/feedback', feedback)
                .then(response => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Feedback submitted successfully!',
                        icon: 'success',
                        timer: 2500,
                        showConfirmButton: false
                    });
                    setFeedback({
                        name: '',
                        email: '',
                        phoneNumber: '',
                        subject: '',
                        message: ''
                    });
                    setErrors({});
                })
                .catch(error => {
                    console.error('Error submitting feedback:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Error submitting feedback',
                        icon: 'error',
                        timer: 2500,
                        showConfirmButton: false
                    });
                });
        }
    };

    return (
        <div className="container mt-5" data-aos="fade-up">
            <h1 className="form-head">Send Us Your Feedback</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            id="name"
                            name="name"
                            value={feedback.name}
                            onChange={handleChange}
                            placeholder="Enter your Name"
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            id="email"
                            name="email"
                            value={feedback.email}
                            onChange={handleChange}
                            placeholder="Enter your Email"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                            id="phoneNumber"
                            name="phoneNumber"
                            value={feedback.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your Contact Number"
                        />
                        {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                            id="subject"
                            name="subject"
                            value={feedback.subject}
                            onChange={handleChange}
                            placeholder="Enter Subject"
                        />
                        {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>
                </div>

                <div className="mb-3 row">
                    <div className="col-sm-10">
                        <textarea
                            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                            id="message"
                            name="message"
                            value={feedback.message}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Enter your message..."
                        ></textarea>
                        {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary-submit">Submit your Feedback</button>
            </form>
        </div>
    );
};

export default Feedback;
