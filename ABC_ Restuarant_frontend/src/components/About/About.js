import React from 'react';
import './About.css';
import restaurant from './restaurant.png';

export const About = () => {
    return (
        <div className="about-container">
            <header className="about-header">
                <h1>Welcome to Our Restaurant</h1>
                <p>Experience a taste of excellence.</p>
            </header>

            <section className="about-story">
                <div className="story-content">
                    <h2>Our Story</h2>
                    <p>At ABC Restaurant, our journey began in 2024 with a vision to redefine the dining experience in our community. From the moment we opened our doors, our mission has been to create a dining haven where exquisite cuisine meets exceptional service, and every visit feels like coming home. </p>
                    <p>Our story is one of passion, dedication, and a commitment to excellence. We believe that great food starts with the best ingredients, and our chefs meticulously source the finest local produce to ensure that every dish is not only delicious but also fresh and sustainable. Our menu is a celebration of flavors, where traditional favorites are given a modern twist, and innovative creations are crafted to delight and surprise.</p>
                    <p>But our dedication goes beyond just food. We have carefully designed our restaurant to offer a warm and welcoming ambiance that makes every guest feel special. Our inviting atmosphere is complemented by attentive service, ensuring that each visit to ABC Restaurant is memorable for all the right reasons.</p>
                    <p>As a cherished local favorite, we take pride in the connections we’ve built with our community. Whether you’re celebrating a special occasion, enjoying a casual meal with friends, or simply treating yourself to a night out, ABC Restaurant is more than just a place to eat—it’s a place where lasting memories are made.</p>
                    <p>Join us at ABC Restaurant and discover for yourself why we’re not just a dining destination, but a beloved part of the local fabric. Experience the perfect blend of flavor, ambiance, and service that makes every visit a special occasion.</p>
                </div>
                <div className="story-image">
                    <img src={restaurant} alt="Restaurant Interior" />
                </div>
            </section>

            <section className="about-values">
                <h2>Our Values</h2>
                <div className="values-grid">
                    <div className="value-box">
                        <div className="value-icon">⭐</div>
                        <h3>Quality</h3>
                        <p>We use only the finest ingredients to ensure every dish is of the highest standard.</p>
                    </div>
                    <div className="value-box">
                        <div className="value-icon">🤝</div>
                        <h3>Customer Service</h3>
                        <p>Providing exceptional service is our priority. We strive to exceed expectations.</p>
                    </div>
                    <div className="value-box">
                        <div className="value-icon">💡</div>
                        <h3>Innovation</h3>
                        <p>We continuously update our menu with exciting new dishes to surprise and delight.</p>
                    </div>
                    <div className="value-box">
                        <div className="value-icon">🌱</div>
                        <h3>Community</h3>
                        <p>We support local producers and engage with the community to make a positive impact.</p>
                    </div>
                </div>
            </section>

            <section className="about-events">
                <h2>Special Events & Offers</h2>
                <div className="events">
                    <div className="event">
                        <h3>Wine Tasting Night</h3>
                        <p>Join us for an exclusive wine tasting experience on the 15th of every month. Discover new wines and enjoy paired dishes crafted by our chefs.</p>
                    </div>
                    <div className="event">
                        <h3>Weekend Brunch Specials</h3>
                        <p>Our weekend brunch features special dishes and drinks. Every Saturday and Sunday from 10 AM to 2 PM, enjoy a delicious brunch with family and friends.</p>
                    </div>
                    <div className="event">
                        <h3>Live Music Fridays</h3>
                        <p>Every Friday night, enjoy live music performances from local artists while savoring your favorite dishes. Music starts at 7 PM.</p>
                    </div>
                </div>
            </section>

            <footer className="about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>
        </div>
    );
};
