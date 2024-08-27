import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Reservation.css';


const tableSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  outlet: yup.string().required('Outlet is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  date: yup.date().required('Date is required'),
  time: yup.string().required('Time is required'),
  guests: yup.number().positive('Number of guests must be positive').required('Number of guests is required'),
  contactNo: yup.string().required('Contact number is required')
});


const validateEmail = async (email) => {
  return true;
};


const ConfirmationDialog = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;
  return (
    <div className="dialog">
      <p>{message}</p>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

const Reservation = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [submitHandler, setSubmitHandler] = useState(() => () => { });
  const [dialogMessage, setDialogMessage] = useState('');

  const {
    register: registerTable,
    handleSubmit: handleTableSubmit,
    formState: { errors: tableErrors }
  } = useForm({
    resolver: yupResolver(tableSchema)
  });

  const onTableSubmit = async (data) => {
    const isEmailValid = await validateEmail(data.email);
    if (!isEmailValid) {
      console.log('Email does not exist');
      return;
    }

    const tableData = { ...data, status: 'pending' };
    setDialogMessage('Are you sure you want to submit the table reservation?');
    setSubmitHandler(() => async () => {
      try {
        await axios.post('/table', tableData);
        alert('Table reservation submitted successfully. You will receive a confirmation in your email!');
        window.location.reload();
      } catch (error) {
        console.error('Error submitting table reservation:', error);
      }
    });
    setShowDialog(true);
  };


  const handleConfirm = async () => {
    setShowDialog(false);
    if (submitHandler) {
      await submitHandler();
    }
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  const outlets = [
    { value: 'Batharamulla', label: 'Batharamulla' },
    { value: 'Maharagama', label: 'Maharagama' },
    { value: 'Athurigitiya', label: 'Athurigitiya' }
  ];

  return (
    <div className="reservation-container">
      <form className="reservation-form" onSubmit={handleTableSubmit(onTableSubmit)}>
        <h1>RESERVE  TABLE</h1>

        <div className="form-row">
          <div className="form-group">
            <label>Name:</label>
            <input type="text" {...registerTable('name')} placeholder="Enter your name" />
            {tableErrors.name && <p>{tableErrors.name.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="outlet">Outlet:</label>
            <select id="outlet" {...registerTable('outlet')}>
              <option value="">Select Your Outlet</option>
              {outlets.map((outlet) => (
                <option key={outlet.value} value={outlet.value}>
                  {outlet.label}
                </option>
              ))}
            </select>
            {tableErrors.outlet && <p>{tableErrors.outlet.message}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email:</label>
            <input type="email" {...registerTable('email')} placeholder="Enter your email" />
            {tableErrors.email && <p>{tableErrors.email.message}</p>}
          </div>
        </div>


        <div className="form-row">
          <div className="form-group">
            <label>Date:</label>
            <input type="date" {...registerTable('date')} />
            {tableErrors.date && <p>{tableErrors.date.message}</p>}
          </div>
          <div className="form-group">
            <label>Time:</label>
            <input type="time" {...registerTable('time')} />
            {tableErrors.time && <p>{tableErrors.time.message}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Number of Guests:</label>
            <input type="number" {...registerTable('guests')} placeholder="Number of guests" />
            {tableErrors.guests && <p>{tableErrors.guests.message}</p>}
          </div>

          <div className="form-group">
            <label>Contact Number:</label>
            <input type="text" {...registerTable('contactNo')} placeholder="Enter contact number" />
            {tableErrors.contactNo && <p>{tableErrors.contactNo.message}</p>}
          </div>
        </div>

        <button type="submit" className="submit-button">Submit Table Reservation</button>
      </form>

      <ConfirmationDialog
        isOpen={showDialog}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        message={dialogMessage}
      />

      <footer className="about-footer">
        <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
      </footer>

    </div>
  );
};

export default Reservation;
