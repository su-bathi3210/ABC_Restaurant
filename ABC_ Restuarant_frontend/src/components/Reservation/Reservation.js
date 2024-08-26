import React, { useState } from 'react';
import './Reservation.css';

const Reservation = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [guests, setGuests] = useState(1);
    const [request, setRequest] = useState('');
    const [branch, setBranch] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const reservationData = {
            name,
            email,
            phone,
            date,
            time,
            guests,
            request,
            branch,
        };

        console.log('Reservation Data:', reservationData);


    };

    return (
        <div className="reservation-container">
            <h1 className="reservation-title">Reserve Your Table</h1>
            <form onSubmit={handleSubmit} className="reservation-form">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        placeholder="Enter Your Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="time"
                        className="form-control"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        id="guests"
                        placeholder="Number of Guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        min="1"
                        max="10"
                        required
                    />
                </div>

                <div className="form-group">
                    <select
                        className="form-control"
                        id="branch"
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select a Branch</option>
                        <option value="Downtown">Bambalapitiya</option>
                        <option value="Uptown">Maharagama</option>
                        <option value="Suburb">Athurugiriya</option>
                    </select>
                </div>

                <div className="form-group">
                    <textarea
                        className="form-control"
                        id="request"
                        placeholder="Enter your request"
                        value={request}
                        onChange={(e) => setRequest(e.target.value)}
                        rows="4"
                    />
                </div>
                <button type="submit" className="btn-submit">Book Now</button>
            </form>
        </div>
    );
};

export default Reservation;
