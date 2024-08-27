import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import AdminFacility from './AdminFacility';
import AdminGallery from './AdminGallery';



function AdminRoutes() {
    return (
        <Routes>
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin-facility' element={<AdminFacility/>} />
            <Route path='/admin-gallery' element={<AdminGallery />} />
        </Routes>
    );
}

export default AdminRoutes;
