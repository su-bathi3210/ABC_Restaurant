import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './StaffReservation.css';

const StaffReservation = () => {
    const [tables, setTables] = useState([]);
    const [editTable, setEditTable] = useState(null);
    const [newTable, setNewTable] = useState({
        name: '',
        outlet: '',
        username: '',
        date: '',
        time: '',
        guests: '',
        contactNo: '',
        status: 'pending'
    });
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const response = await axios.get('/table');
            setTables(response.data);
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTable({ ...newTable, [name]: value });
    };

    const handleAddTable = async () => {
        try {
            await axios.post('/table', newTable);
            fetchTables();
            setNewTable({
                name: '',
                outlet: '',
                username: '',
                date: '',
                time: '',
                guests: '',
                contactNo: '',
                status: 'pending'
            });
            setShowPopup(false); // Hide popup after adding
        } catch (error) {
            console.error('Error adding table:', error);
        }
    };

    const handleEdit = (table) => {
        setEditTable(table);
        setNewTable(table);
        setShowPopup(true); // Show popup for editing
    };

    const handleUpdateTable = async () => {
        try {
            await axios.put(`/table/${editTable.id}`, newTable);
            fetchTables();
            setEditTable(null);
            setNewTable({
                name: '',
                outlet: '',
                username: '',
                date: '',
                time: '',
                guests: '',
                contactNo: '',
                status: 'pending'
            });
            setShowPopup(false); // Hide popup after updating
        } catch (error) {
            console.error('Error updating table:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/table/${id}`);
            fetchTables();
        } catch (error) {
            console.error('Error deleting table:', error);
        }
    };

    return (
        <div className="staff-reservation-container">
            <h1>Manage Reservations</h1>
            <p>At ABC Restaurant, our staff can efficiently handle reservations using our streamlined management system. They can also adjust the status of reservations to keep track of pending and confirmed bookings. This system ensures that staff can seamlessly manage and accommodate guest requests.</p>

            <button className="open-popup-button" onClick={() => setShowPopup(true)}>
                Add New Reservation
            </button>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <h2>{editTable ? 'Edit Reservation' : 'Add New Reservation'}</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={newTable.name}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="outlet"
                            placeholder="Outlet"
                            value={newTable.outlet}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={newTable.username}
                            onChange={handleInputChange}
                        />
                        <input
                            type="date"
                            name="date"
                            placeholder="Date"
                            value={newTable.date}
                            onChange={handleInputChange}
                        />
                        <input
                            type="time"
                            name="time"
                            placeholder="Time"
                            value={newTable.time}
                            onChange={handleInputChange}
                        />
                        <input
                            type="number"
                            name="guests"
                            placeholder="Number of Guests"
                            value={newTable.guests}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="contactNo"
                            placeholder="Contact Number"
                            value={newTable.contactNo}
                            onChange={handleInputChange}
                        />
                        <button onClick={editTable ? handleUpdateTable : handleAddTable}>
                            {editTable ? 'Update Reservation' : 'Add Reservation'}
                        </button>
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                </div>
            )}

            <div className="table-list">
                <h2>Reservations List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Outlet</th>
                            <th>Username</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Guests</th>
                            <th>Contact No</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table) => (
                            <tr key={table.id}>
                                <td>{table.name}</td>
                                <td>{table.outlet}</td>
                                <td>{table.username}</td>
                                <td>{table.date}</td>
                                <td>{table.time}</td>
                                <td>{table.guests}</td>
                                <td>{table.contactNo}</td>
                                <td>{table.status}</td>
                                <td>
                                    <button onClick={() => handleEdit(table)}>Edit</button>
                                    <button onClick={() => handleDelete(table.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StaffReservation;
