import React from 'react';
import './Offer.css';
import burger from '../../admin_assets/burger.png'

const Offer = () => {
  return (
    <div className="offer-container">
      <div className="offer-content">
        <h1 className="offer-heading">Special Offer</h1>
        <p className="offer-paragraph">
          Enjoy our exclusive offer! Get 20% off on your first order. Don’t miss out on this limited-time opportunity to experience our delicious cuisine at a special price.
        </p>
        <button className="offer-button">Claim Your Offer</button>
      </div>
      <div className="offer-image">
        <img src={burger} alt="Offer" />
      </div>
    </div>
  );
}

export default Offer;
