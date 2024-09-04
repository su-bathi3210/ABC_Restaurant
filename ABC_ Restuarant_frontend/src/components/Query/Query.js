import React, { useState } from 'react';
import axios from 'axios';
import './Query.css';

const Query = () => {
    // State to manage form inputs, messages, and validation errors
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    // Validation function
    const validate = () => {
        const validationErrors = {};
        if (!name) validationErrors.name = 'Name is required';
        if (!email) validationErrors.email = 'Email is required';
        if (!subject) validationErrors.subject = 'Subject is required';
        if (!message) validationErrors.message = 'Message is required';

        // Regex for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            validationErrors.email = 'Please enter a valid email address';
        }

        return validationErrors;
    };

    // Submit function
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

            // Example: Logging the response data
            console.log('Server response:', response.data);

            setSuccess('Your query has been submitted successfully!');
            setName('');
            setEmail('');
            setSubject('');
            setMessage('');
            setErrors({});
        } catch (error) {
            console.error('Error submitting query:', error);
            setErrors({ submit: 'Failed to submit your query. Please try again later.' });
        }
    };

    return (
        <div className="query-container">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit} className="query-form">
                <div className="form-group">
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Enter the subject"
                    />
                    {errors.subject && <p className="error-message">{errors.subject}</p>}
                </div>
                <div className="form-group">
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter your message"
                    ></textarea>
                    {errors.message && <p className="error-message">{errors.message}</p>}
                </div>
                
                {errors.submit && <p className="error-message">{errors.submit}</p>}
                {success && <p className="success-message">{success}</p>}
                <button type="submit">Submit Query</button>
            </form>
        </div>
    );
};

export default Query;
