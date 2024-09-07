import React, { useState } from 'react';
import axios from 'axios';
import './Query.css';

const Query = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const validationErrors = {};
        if (!name) validationErrors.name = 'Name is required';
        if (!email) validationErrors.email = 'Email is required';
        if (!subject) validationErrors.subject = 'Subject is required';
        if (!message) validationErrors.message = 'Message is required';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            validationErrors.email = 'Please enter a valid email address';
        }

        return validationErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('/api/query', {
                name,
                email,
                subject,
                message,
                status: 'Pending',
                respond: '',
            });

            console.log('Server response:', response.data);

            // Display the success message as a popup
            window.alert('Your query has been submitted successfully!');

            // Refresh the page
            window.location.reload();
        } catch (error) {
            console.error('Error submitting query:', error);
            setErrors({ submit: 'Failed to submit your query. Please try again later.' });
        }
    };

    return (
        <div className='query'>
            <h1>Query</h1>
            <p>Thank you for choosing ABC Restaurant! We value your feedback and inquiries. If you have any questions, concerns, or suggestions, please don't hesitate to reach out to us. Simply fill out the form below, and our team will get back to you as soon as possible. Your satisfaction is our top priority, and we look forward to serving you!</p>
            <div className="query-container">
                <form onSubmit={handleSubmit} className="query-form">
                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter Your Name"
                            />
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Your Email"
                            />
                            {errors.email && <p className="error-message">{errors.email}</p>}
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter The Subject"
                        />
                        {errors.subject && <p className="error-message">{errors.subject}</p>}
                    </div>
                    <div className="form-group">
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter Your Message"
                        ></textarea>
                        {errors.message && <p className="error-message">{errors.message}</p>}
                    </div>

                    {errors.submit && <p className="error-message">{errors.submit}</p>}
                    <button type="submit" title="Click to submit your query">Submit Query</button>
                </form>
            </div>
            <footer className="about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Query;
