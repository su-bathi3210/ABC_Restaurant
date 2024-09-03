import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Offers = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    axios.get('/offer')
      .then(response => setOffers(response.data))
      .catch(error => console.error('Error fetching offers:', error));
  }, []);

  return (
    <div className="deals-container">
      <h2>Avalible Offers</h2>
      <p>At ABC Restaurant, we are excited to present a variety of exclusive offers designed to enhance your dining experience. Whether you're joining us for a casual meal or a special occasion, our current promotions provide fantastic value on our most popular dishes. Don't miss out on the opportunity to enjoy delicious meals at unbeatable prices—check out our available offers today and indulge in the culinary delights that make ABC Restaurant a favorite among food lovers.</p>

      <ul className="deals-list">
        {offers.map(offer => (
          <li key={offer.offerId} className="deals-item">
            <div className="deals-image">
              <img src={offer.Image} alt={offer.offerCode} />
            </div>
            <div className="deals-details">
              <p className="deals-code">Code: {offer.offerCode}</p>
              <p className="deals-description">{offer.description}</p>
              <p className="deals-discount">Discount: {offer.discountPercentage}%</p>
              <p className="deals-value">
                Value: ${offer.Value ? offer.Value.toFixed(2) : 'N/A'}
              </p>
              <p className="deals-terms">Terms & Conditions apply</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Offers;
