import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Staff from './Staff';
import StaffNavbar from './StaffNavbar';
import StaffReservation from './StaffReservation';

function StaffRoutes() {
  const location = useLocation();


  const navbarRoutes = [
    '/staff',
    '/staff-orders',
    '/staff-reservation',
    '/staff-users',
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
      </Routes>
    </>
  );
}

export default StaffRoutes;
