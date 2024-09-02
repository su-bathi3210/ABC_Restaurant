import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Admin from './Admin';
import AdminFacility from './AdminFacility';
import AdminGallery from './AdminGallery';
import AdminNavbar from './AdminNavbar';
import AdminProduct from './AdminProduct';
import AdminReservation from './AdminReservation';
import AdminOther from './AdminOther';
import AdminUser from './AdminUser';

function AdminRoutes() {
    const location = useLocation();

    
    const navbarRoutes = [
        '/admin',
        '/admin-product',
        '/admin-gallery',
        '/admin-facility',
        '/admin-reservation',
        '/admin-other',
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
                <Route path='/admin-other' element={<AdminOther />} />
                <Route path='/admin-user' element={<AdminUser />} />
            </Routes>
        </>
    );
}

export default AdminRoutes;
