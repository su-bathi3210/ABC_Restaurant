import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Staff from './Staff';
import StaffNavbar from './StaffNavbar';
import StaffReservation from './StaffReservation';
import StaffFeedback from './StaffFeedback';
import StaffBranch from './StaffBranch';
import StaffOrder from './StaffOrder';
import StaffQuery from './StaffQuery';

function StaffRoutes() {
  const location = useLocation();


  const navbarRoutes = [
    '/staff',
    '/staff-order',
    '/staff-reservation',
    '/staff-feedback',
    '/staff-other',
    '/staff-branch',
    '/staff-query'
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
        <Route path='/staff-branch' element={<StaffBranch />} />
        <Route path='/staff-order' element={<StaffOrder />} />
        <Route path='/staff-query' element={<StaffQuery />} />
      </Routes>
    </>
  );
}

export default StaffRoutes;
