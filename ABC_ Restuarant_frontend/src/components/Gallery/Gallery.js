import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure you import axios for making HTTP requests
import './Gallery.css';

const Gallery = () => {
  const [activeForm, setActiveForm] = useState('Food');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/gallery/gallery', { params: { name: activeForm } });
        console.log(response.data); // Debugging: Check the structure of response

        // Check if response.data.images is an array of base64 image strings
        if (Array.isArray(response.data.images)) {
          setImages(response.data.images);
        } else {
          console.error('Unexpected response format:', response.data);
          setImages([]);
        }
      } catch (error) {
        console.error('Error fetching gallery images', error);
      }
    };

    fetchImages();
  }, [activeForm]);

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Gallery</h1>
        <p>Discover Our Culinary Delights</p>
        <p>Immerse yourself in the vibrant world of our restaurant through our gallery...</p>
      </div>
      <div className="full-gallery-container">
        <div className="galleries-container">
          <div className="galleries-button-group">
            <button
              onClick={() => setActiveForm('Food')}
              className={`galleries-form-toggle-button ${activeForm === 'Food' ? 'active' : ''}`}
            >
              Food
            </button>
            <button
              onClick={() => setActiveForm('Restaurant')}
              className={`galleries-form-toggle-button ${activeForm === 'Restaurant' ? 'active' : ''}`}
            >
              Restaurant
            </button>
            <button
              onClick={() => setActiveForm('Other')}
              className={`galleries-form-toggle-button ${activeForm === 'Other' ? 'active' : ''}`}
            >
              Other
            </button>
          </div>

          <div className="galleries-images">
            {images.length > 0 ? (
              images.map((imageData, index) => (
                <div key={index} className="galleries-image">
                  <img
                    src={`data:image/jpeg;base64,${imageData}`} // Make sure imageData is just the base64 string
                    alt={`${activeForm} Gallery Image`}
                  />
                </div>
              ))
            ) : (
              <p>No images available for {activeForm}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
