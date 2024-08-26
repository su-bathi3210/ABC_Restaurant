import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminMenu from './AdminMenu';
import Admin from './Admin';
import AdminReservation from './AdminReservation';

function AdminRoutes() {
    return (
        <Routes>
            <Route path='/admin' element={<Admin />} />
            <Route path='/adminmenu' element={<AdminMenu />} />
            <Route path='/adminreservations' element={<AdminReservation />} />
        </Routes>
    );
}

export default AdminRoutes;
