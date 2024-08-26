import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Feedback Submitted:', { name, email, feedback });
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>We’d love to hear from you! Whether you have a question about our menu, want to make a reservation, or need more information about our services, we’re here to help. At ABC Restaurant, we value your feedback and are committed to ensuring a memorable dining experience. Please use the form below to get in touch with us, or reach out directly via phone or email. We look forward to serving you!</p>
      
      <div className="contact-content">
        <div className="contact-box">
          <h2>Our Location</h2>
          <p>123 Restaurant St., Bambalapitiya, Colombo</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: abc@restaurant.com</p>
        </div>
        
        <div className="contact-box">
          <h2>Working Hours</h2>
          <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
          <p>Saturday - Sunday: 9:00 AM - 11:00 PM</p>
        </div>
      </div>
      
      <div className="feedback-form">
        <h2>Send Us Your Feedback</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          /> <br></br>
          
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          /> <br></br>
          
          <label htmlFor="feedback">Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your feedback with us"
            required
          ></textarea>
          
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
