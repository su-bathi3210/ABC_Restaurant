import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import CustomerNavbar from './CustomerNavbar';
import Customer from './Customer';
import Footer from '../Footer/Footer';
import CustomerReservation from './CustomerReservation';
import CustomerQuery from './CustomerQuery';
import CustomerContact from './CustomerContact';
import CustomerGallery from './CustomerGallery';
import CustomerFacility from './CustomerFacility';
import CustomerMenu from './CustomerMenu';
import Cart from '../../pages/Cart/Cart';
import PlaceOrder from '../../pages/PlaceOrder/PlaceOrder';

function CustomerRoutes() {
    const location = useLocation();

    const shouldShowFooter = location.pathname === '/';

    const navbarRoutes = [
        '/customer',
        '/customer-reservation',
        '/customer-query',
        '/customer-contact',
        '/customer-gallery',
        '/customer-facility',
        '/customer-menu',
        '/cart',
        '/order'
    ];

    return (
        <>
            {navbarRoutes.includes(location.pathname) && (
                <CustomerNavbar />
            )}

            <Routes>
                <Route path='/customer' element={<Customer />} />
                <Route path='/customer-reservation' element={<CustomerReservation />} />
                <Route path='/customer-query' element={<CustomerQuery />} />
                <Route path='/customer-contact' element={<CustomerContact />} />
                <Route path='/customer-gallery' element={<CustomerGallery />} />
                <Route path='/customer-facility' element={<CustomerFacility />} />
                <Route path='/customer-menu' element={<CustomerMenu />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/order' element={<PlaceOrder />} />
            </Routes>

            {shouldShowFooter && <Footer />}
        </>
    );
}

export default CustomerRoutes;
