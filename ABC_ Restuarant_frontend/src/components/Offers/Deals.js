import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Deals = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('/offer');
        setOffers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching offers');
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="deals-page">
      <h1>Special Offers</h1>
      <p>Special Offers</p>
      <div className="deals-container">
        {offers.map((offer) => (
          <div key={offer.id} className="deal-card">
            <img src={offer.offerImage} alt={offer.offerName} className="deal-image" />
            <h2 className="deal-name">{offer.offerName}</h2>
            <p className="deal-description">{offer.offerDescription}</p>
            <p className="deal-value">Value: ${offer.offerValue.toFixed(2)}</p>
            <p className="deal-code">Code: {offer.couponCode}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deals;
