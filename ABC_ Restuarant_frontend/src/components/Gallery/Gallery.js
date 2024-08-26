import React, { useState, useEffect } from 'react';
import './Gallery.css';
import food1 from '../../images/food1.jpg';
import dessert1 from '../../images/dessert1.jpg';
import beverage1 from '../../images/beverage1.jpg';
import restaurant1 from '../../images/restaurant1.jpg';
import dessert2 from '../../images/dessert2.jpg';
import restaurant2 from '../../images/restaurant2.jpg'
import dessert3 from '../../images/dessert3.jpg'
import food2 from '../../images/food2.jpg'
import beverage2 from '../../images/beverage2.jpg'


const mockData = [
  { id: 1, category: 'Food', path: food1 },
  { id: 2, category: 'Dessert', path: dessert1 },
  { id: 3, category: 'Beverages', path: beverage1 },
  { id: 4, category: 'Restaurant', path: restaurant1 },
  { id: 5, category: 'Dessert', path: dessert2 },
  { id: 6, category: 'Dessert', path: dessert3 },
  { id: 7, category: 'Restaurant', path: restaurant2 },
  { id: 8, category: 'Food', path: food2 },
  { id: 9, category: 'Beverages', path: beverage2 },

];

const Gallery = () => {
  const [category, setCategory] = useState('All');
  const [images, setImages] = useState([]);

  useEffect(() => {
    const filteredImages = category === 'All' ? mockData : mockData.filter(img => img.category === category);
    setImages(filteredImages);
  }, [category]);

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Gallery</h1>
        <p>Discover Our Culinary Delights</p><br></br>
        <p1>Immerse yourself in the vibrant world of our restaurant through our gallery. Each photo captures the essence of our culinary creations, from mouthwatering main courses to delectable desserts and refreshing beverages. Our gallery showcases the care and artistry that go into every dish, offering you a visual preview of the exceptional dining experience that awaits. Browse through and let your taste buds anticipate the delightful flavors we serve!</p1>
        <div className="gallery-categories">
          <button onClick={() => setCategory('All')}>All</button>
          <button onClick={() => setCategory('Food')}>Food</button>
          <button onClick={() => setCategory('Dessert')}>Dessert</button>
          <button onClick={() => setCategory('Beverages')}>Beverages</button>
          <button onClick={() => setCategory('Restaurant')}>Restaurant</button>
        </div>
      </div>
      <div className="gallery-grid">
        {images.map(img => (
          <div key={img.id} className="gallery-item">
            <img src={img.path} alt={`Gallery ${img.id}`} />
          </div>
        ))}
      </div>
      <footer className="about-footer">
        <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Gallery;
