import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Staff from './Staff';
import StaffNavbar from './StaffNavbar';
import StaffReservation from './StaffReservation';
import StaffFeedback from './StaffFeedback';

function StaffRoutes() {
  const location = useLocation();


  const navbarRoutes = [
    '/staff',
    '/staff-orders',
    '/staff-reservation',
    '/staff-feedback',
    '/staff-other'
  ];

  return (
    <>
      {navbarRoutes.includes(location.pathname) && (
        <StaffNavbar />
      )}

      <Routes>
        <Route path='/staff' element={<Staff />} />
        <Route path='/staff-reservation' element={<StaffReservation />} />
        <Route path='/staff-feedback' element={<StaffFeedback />} />
      </Routes>
    </>
  );
}

export default StaffRoutes;
