import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Staff.css';

const StaffReservation = () => {
    const [tables, setTables] = useState([]);
    const [editingTable, setEditingTable] = useState(null);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [newReservationData, setNewReservationData] = useState({
        name: '',
        contactNo: '',
        username: '',
        date: '',
        time: '',
        guests: '',
        outlet: '',
        tableNo: '',
        status: 'Pending'
    });
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = () => {
        axios.get('/table')
            .then(response => {
                const sortedTables = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                setTables(sortedTables);
            })
            .catch(error => console.error('Error fetching tables:', error));
    };

    const handleEdit = (table) => {
        setEditingTable({ ...table });
        setShowEditPopup(true);
    };

    const handleUpdate = () => {
        axios.put(`/table/${editingTable.id}`, editingTable)
            .then(() => {
                setTables(prevTables =>
                    prevTables.map(table =>
                        table.id === editingTable.id ? editingTable : table
                    )
                );
                setEditingTable(null);
                setShowEditPopup(false);
            })
            .catch(error => console.error('Error updating table:', error));
    };

    const handleDelete = (tableId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this table?');
        if (isConfirmed) {
            axios.delete(`/table/${tableId}`)
                .then(() => {
                    setTables(prevTables =>
                        prevTables.filter(table => table.id !== tableId)
                    );
                })
                .catch(error => {
                    console.error('Error deleting table:', error.response ? error.response.data : error.message);
                });
        }
    };

    const handleAddNewReservation = () => {
        setShowAddPopup(true);
    };

    const handleCreateReservation = () => {
        axios.post('/table', newReservationData)
            .then(response => {
                setTables([response.data, ...tables]);
                setShowAddPopup(false);
                setNewReservationData({
                    name: '',
                    contactNo: '',
                    username: '',
                    date: '',
                    time: '',
                    guests: '',
                    outlet: '',
                    tableNo: '',
                    status: 'Pending'
                });
            })
            .catch(error => console.error('Error creating new reservation:', error));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleTimeString(undefined, options);
    };

    const filteredTables = tables.filter(table =>
        table.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.contactNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="staff-table-container">
            <h1>Manage Reservation</h1>
            <p>At ABC Restaurant, our staff can efficiently manage reservations using a user-friendly system. The system simplifies reservation management, ensures smooth operations and enhances our guests' dining experience.</p>

            <button className="add-reservation-button" onClick={handleAddNewReservation}>
                Add New Reservation
            </button>

            <input
                type="text"
                placeholder="Search by name, contact no, email, date, or status"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />


            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact No</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Guests</th>
                        <th>Outlet</th>
                        <th>T.No</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTables.map((table) => (
                        <tr key={table.id}>
                            <td>{table.name}</td>
                            <td>{table.contactNo}</td>
                            <td>{table.username}</td>
                            <td>{formatDate(table.date)}</td>
                            <td>{formatTime(table.date)}</td>
                            <td>{table.guests}</td>
                            <td>{table.outlet}</td>
                            <td>{table.tableNo}</td>
                            <td>{table.status}</td>
                            <td>
                                <button onClick={() => handleEdit(table)}>Edit</button>
                                <button onClick={() => handleDelete(table.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {showEditPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <h2>Edit Reservation</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Customer Name"
                            value={editingTable.name}
                            onChange={(e) => setEditingTable({ ...editingTable, name: e.target.value })}
                        />
                        <input
                            type="text"
                            name="contactNo"
                            placeholder="Contact Number"
                            value={editingTable.contactNo}
                            onChange={(e) => setEditingTable({ ...editingTable, contactNo: e.target.value })}
                        />
                        <input
                            type="email"
                            name="username"
                            placeholder="Email"
                            value={editingTable.username}
                            onChange={(e) => setEditingTable({ ...editingTable, username: e.target.value })}
                        />
                        <input
                            type="date"
                            name="date"
                            placeholder="Date"
                            value={editingTable.date}
                            onChange={(e) => setEditingTable({ ...editingTable, date: e.target.value })}
                        />
                        <input
                            type="time"
                            name="time"
                            placeholder="Time"
                            value={editingTable.time}
                            onChange={(e) => setEditingTable({ ...editingTable, time: e.target.value })}
                        />
                        <input
                            type="number"
                            name="guests"
                            placeholder="Number of Guests"
                            value={editingTable.guests}
                            onChange={(e) => setEditingTable({ ...editingTable, guests: e.target.value })}
                        />
                        <input
                            type="text"
                            name="outlet"
                            placeholder="Outlet"
                            value={editingTable.outlet}
                            onChange={(e) => setEditingTable({ ...editingTable, outlet: e.target.value })}
                        />
                        <input
                            type="text"
                            name="tableNo"
                            placeholder="Table No"
                            value={editingTable.tableNo}
                            onChange={(e) => setEditingTable({ ...editingTable, tableNo: e.target.value })}
                        />
                        <select
                            name="status"
                            value={editingTable.status}
                            onChange={(e) => setEditingTable({ ...editingTable, status: e.target.value })}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <div className="popup-actions">
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setShowEditPopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}


            {showAddPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <h2>Add New Reservation</h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Customer Name"
                            value={newReservationData.name}
                            onChange={(e) => setNewReservationData({ ...newReservationData, name: e.target.value })}
                        />
                        <input
                            type="text"
                            name="contactNo"
                            placeholder="Contact Number"
                            value={newReservationData.contactNo}
                            onChange={(e) => setNewReservationData({ ...newReservationData, contactNo: e.target.value })}
                        />
                        <input
                            type="email"
                            name="username"
                            placeholder="Email"
                            value={newReservationData.username}
                            onChange={(e) => setNewReservationData({ ...newReservationData, username: e.target.value })}
                        />
                        <input
                            type="date"
                            name="date"
                            placeholder="Date"
                            value={newReservationData.date}
                            onChange={(e) => setNewReservationData({ ...newReservationData, date: e.target.value })}
                        />
                        <input
                            type="time"
                            name="time"
                            placeholder="Time"
                            value={newReservationData.time}
                            onChange={(e) => setNewReservationData({ ...newReservationData, time: e.target.value })}
                        />
                        <input
                            type="number"
                            name="guests"
                            placeholder="Number of Guests"
                            value={newReservationData.guests}
                            onChange={(e) => setNewReservationData({ ...newReservationData, guests: e.target.value })}
                        />
                        <input
                            type="text"
                            name="outlet"
                            placeholder="Outlet"
                            value={newReservationData.outlet}
                            onChange={(e) => setNewReservationData({ ...newReservationData, outlet: e.target.value })}
                        />
                        <input
                            type="text"
                            name="tableNo"
                            placeholder="Table No"
                            value={newReservationData.tableNo}
                            onChange={(e) => setNewReservationData({ ...newReservationData, tableNo: e.target.value })}
                        />
                        <select
                            name="status"
                            value={newReservationData.status}
                            onChange={(e) => setNewReservationData({ ...newReservationData, status: e.target.value })}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <div className="popup-actions">
                            <button onClick={handleCreateReservation}>Add Reservation</button>
                            <button onClick={() => setShowAddPopup(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="admin-about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default StaffReservation;
