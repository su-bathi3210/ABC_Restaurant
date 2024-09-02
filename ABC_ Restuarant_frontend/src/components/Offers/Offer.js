import React from 'react';
import { Link } from 'react-router-dom';
import './Offer.css';
import burger from '../../admin_assets/burger.png'

const Offer = () => {
  return (
    <div className="offer-container">
      <div className="offer-content">
        <h1 className="offer-heading">Today's</h1>
        <h1 className="offer-heading-1">Delicious Menu</h1>
        <h1 className="offer-heading-2">Limited Time offer</h1>
        <p className="offer-paragraph">Enjoy our exclusive offer! Get 20% off on your first order. <br></br>Plus, don’t miss out on a limited-time opportunity buy two burgers and get a 30% discount. Experience our delicious cuisine at a special price!</p>
      
        <Link to="/deals"> <button className="offer-button">Claim Your Offer</button> </Link>
      </div>
      <div className="offer-image">
        <img src={burger} alt="Offer" />
      </div>
    </div>
  );
}

export default Offer;
