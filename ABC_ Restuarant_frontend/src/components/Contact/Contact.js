import React from 'react';
import Feedback from './Feedback';
import './Contact.css'
import image1 from '../../images/image1.jpg'
import image2 from '../../images/image2.jpg'
import image3 from '../../images/image3.jpg'
import image4 from '../../images/image4.jpg'


const Contact = () => {
    return (
        <div className="contact-page-container">
            <h1 className="contact-heading" data-aos="fade-down">Contact Us</h1>
            <p className="contact-paragraph" data-aos="fade-down">We’re genuinely excited to connect with our valued guests. Your experiences, questions, and insights mean the world to us, and we’re here to ensure that every interaction you have with us is memorable and fulfilling. Our commitment to exceptional service extends beyond our doors, and we believe that the conversation doesn’t end when you leave the restaurant. We’re eager to hear from you whether it’s a suggestion for improvement, a note of appreciation, or a simple inquiry.</p>

            <div className="contact-content">
                <div className="contact-info" data-aos="fade-right">
                    <div className="location">
                        <h2>Our Location</h2>
                        <p>123 Main Street, City, Country</p>
                        <p>Phone: (123) 456-7890</p>
                        <p>Email: info@abcrestaurant.com</p>
                    </div><br></br>

                    <div className="working-hours" data-aos="fade-left">
                        <h2>Working Hours</h2>
                        <p>Monday - Friday: 10:00 AM - 10:00 PM</p>
                        <p>Saturday - Sunday: 12:00 PM - 11:00 PM</p>
                    </div>
                </div>
                <div className="feedback-form-section" data-aos="fade-up">
                    <Feedback />
                </div>
            </div>

            {/* Image row below the feedback form */}
            <div className="image-row" data-aos="fade-up">
                <img src={image1} alt="Description 1" />
                <img src={image2} alt="Description 2" />
                <img src={image3} alt="Description 3" />
                <img src={image4} alt="Description 4" />
            </div>

            <footer className="about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>

        </div>
    );
};

export default Contact;