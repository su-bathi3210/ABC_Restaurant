import React, { useContext, useState } from 'react';
import { StoreContext } from '../StoreContext/StoreContext';
import './AdminMenu.css';


import logo from '../../assets/logo.png';

const AdminMenu = () => {
    const { food_list, setFoodList } = useContext(StoreContext);
    const [newFood, setNewFood] = useState({ name: '', description: '', price: '', image: '', category: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFood({ ...newFood, [name]: value });
    };

    const addFood = () => {
        const newFoodItem = { ...newFood, _id: Date.now().toString() };
        setFoodList(prev => [...prev, newFoodItem]);
        setNewFood({ name: '', description: '', price: '', image: '', category: '' });
    };

    const updateFood = (id, updatedFood) => {
        setFoodList(prev => prev.map(item => (item._id === id ? updatedFood : item)));
    };

    const deleteFood = (id) => {
        setFoodList(prev => prev.filter(item => item._id !== id));
    };

    return (
        <div className="admin-panel">
            <img src={logo} alt="Logo" className="admin-panel-logo" />
            <h2>Admin Panel</h2>
            <div className="admin-panel-form">
                <input type="text" name="name" value={newFood.name} onChange={handleInputChange} placeholder="Food Name" />
                <input type="text" name="description" value={newFood.description} onChange={handleInputChange} placeholder="Description" />
                <input type="text" name="price" value={newFood.price} onChange={handleInputChange} placeholder="Price" />
                <input type="text" name="image" value={newFood.image} onChange={handleInputChange} placeholder="Image URL" />
                <input type="text" name="category" value={newFood.category} onChange={handleInputChange} placeholder="Category" />
                <button onClick={addFood}>Add Food</button>
            </div>

            <div className="admin-panel-list">
                {food_list.map((item) => (
                    <div key={item._id} className="admin-panel-item">
                        <img src={item.image} alt={item.name} className="admin-panel-item-image" />
                        <p>{item.name}</p>
                        <button onClick={() => updateFood(item._id, { ...item, name: 'Updated Name' })}>Update</button>
                        <button onClick={() => deleteFood(item._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminMenu;
