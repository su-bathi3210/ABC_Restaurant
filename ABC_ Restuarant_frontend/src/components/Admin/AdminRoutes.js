import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import AdminFacility from './AdminFacility';
import AdminGallery from './AdminGallery';
import AdminReservation from './AdminReservation';



function AdminRoutes() {
    return (
        <Routes>
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin-facility' element={<AdminFacility/>} />
            <Route path='/admin-gallery' element={<AdminGallery />} />
            <Route path='/admin-reservation' element={<AdminReservation />} />
        </Routes>
    );
}

export default AdminRoutes;
