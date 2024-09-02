import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDeals = () => {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({
    couponCode: '',
    offerDescription: '',
    offerName: '',
    offerImage: '',
    offerValue: ''
  });
  const [editingOffer, setEditingOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOffer({ ...newOffer, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingOffer({ ...editingOffer, [name]: value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddOffer = async () => {
    try {
      let imageUrl = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const uploadResponse = await axios.post('/offer/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        imageUrl = uploadResponse.data; // Assuming the response contains the URL or path
      }
      const offerToAdd = { ...newOffer, offerImage: imageUrl };
      await axios.post('/offer', offerToAdd);
      setNewOffer({
        couponCode: '',
        offerDescription: '',
        offerName: '',
        offerImage: '',
        offerValue: ''
      });
      setImageFile(null);
      const response = await axios.get('/offer');
      setOffers(response.data);
    } catch (error) {
      setError('Error adding offer');
    }
  };

  const handleDeleteOffer = async (id) => {
    try {
      await axios.delete(`/offer/${id}`);
      const response = await axios.get('/offer');
      setOffers(response.data);
    } catch (error) {
      console.error('Error deleting offer:', error);
      setError('Error deleting offer');
    }
  };

  const handleEditOffer = async () => {
    try {
      if (editingOffer.id) {
        await axios.put(`/offer/${editingOffer.id}`, editingOffer);
        setEditingOffer(null);
        const response = await axios.get('/offer');
        setOffers(response.data);
      } else {
        setError('No offer selected for editing');
      }
    } catch (error) {
      setError('Error updating offer');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-deals">
      <h1>Admin Deals Management</h1>

      <div className="form-section">
        <h2>Add New Offer</h2>
        <input
          type="text"
          name="couponCode"
          placeholder="Coupon Code"
          value={newOffer.couponCode}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="offerName"
          placeholder="Offer Name"
          value={newOffer.offerName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="offerDescription"
          placeholder="Offer Description"
          value={newOffer.offerDescription}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="offerImage"
          onChange={handleFileChange}
        />
        <input
          type="number"
          name="offerValue"
          placeholder="Offer Value"
          value={newOffer.offerValue}
          onChange={handleInputChange}
        />
        <button onClick={handleAddOffer}>Add Offer</button>
      </div>

      <div className="offers-list">
        <h2>Manage Existing Offers</h2>
        {offers.map((offer) => (
          <div key={offer.id} className="offer-card">
            <img src={offer.offerImage} alt={offer.offerName} className="offer-image" />
            <h2 className="offer-name">{offer.offerName}</h2>
            <p className="offer-description">{offer.offerDescription}</p>
            <p className="offer-value">Value: ${offer.offerValue.toFixed(2)}</p>
            <p className="offer-code">Code: {offer.couponCode}</p>
            <button onClick={() => setEditingOffer(offer)}>Edit</button>
            <button onClick={() => handleDeleteOffer(offer.id)}>Delete</button>
          </div>
        ))}
      </div>

      {editingOffer && (
        <div className="edit-form">
          <h2>Edit Offer</h2>
          <input
            type="text"
            name="couponCode"
            placeholder="Coupon Code"
            value={editingOffer.couponCode}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="offerName"
            placeholder="Offer Name"
            value={editingOffer.offerName}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="offerDescription"
            placeholder="Offer Description"
            value={editingOffer.offerDescription}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="offerImage"
            placeholder="Offer Image URL"
            value={editingOffer.offerImage}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="offerValue"
            placeholder="Offer Value"
            value={editingOffer.offerValue}
            onChange={handleEditChange}
          />
          <button onClick={handleEditOffer}>Update Offer</button>
          <button onClick={() => setEditingOffer(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AdminDeals;
