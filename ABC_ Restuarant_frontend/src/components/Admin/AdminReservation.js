import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminReservation.css';

const AdminReservation = () => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('/reservations');
            setReservations(response.data);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    const deleteReservation = async (id) => {
        try {
            await axios.delete(`/reservations/${id}`);
            fetchReservations();
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };

    return (
        <div className="admin-panel-container">
            <h1>Admin Panel</h1>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Guests</th>
                        <th>Branch</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr key={reservation.reservationId}>
                            <td>{reservation.name}</td>
                            <td>{reservation.email}</td>
                            <td>{reservation.phone}</td>
                            <td>{new Date(reservation.date).toLocaleDateString()}</td>
                            <td>{reservation.time}</td>
                            <td>{reservation.persons}</td>
                            <td>{reservation.branch}</td>
                            <td>
                                <button
                                    onClick={() => deleteReservation(reservation.reservationId)}
                                    className="btn-delete">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminReservation;
