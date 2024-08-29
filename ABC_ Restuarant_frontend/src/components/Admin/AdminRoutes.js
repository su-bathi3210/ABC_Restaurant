import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminFacility from './AdminFacility';
import AdminGallery from './AdminGallery';
import AdminReservation from './AdminReservation';
import AdminNavbar from './AdminNavbar';
import Admin from './Admin';
import AdminProduct from './AdminProduct';
import AdminUser from './AdminUser';

function AdminRoutes() {
    const location = useLocation();

    
    const navbarRoutes = [
        '/admin',
        '/admin-product',
        '/admin-gallery',
        '/admin-facility',
        '/admin-reservation',
        '/admin-user'
    ];

    return (
        <>
            {navbarRoutes.includes(location.pathname) && (
                <AdminNavbar />
            )}

            <Routes>
                <Route path='/admin' element={<Admin />} />
                <Route path='/admin-facility' element={<AdminFacility />} />
                <Route path='/admin-gallery' element={<AdminGallery />} />
                <Route path='/admin-reservation' element={<AdminReservation />} />
                <Route path='/admin-product' element={<AdminProduct />} />
                <Route path='/admin-user' element={<AdminUser />} />
            </Routes>
        </>
    );
}

export default AdminRoutes;
