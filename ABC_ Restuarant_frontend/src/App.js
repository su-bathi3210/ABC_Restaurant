import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { About } from './components/About/About';
import AdminRoutes from './components/Admin/AdminRoutes';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Gallery from './components/Gallery/Gallery';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Menu from './components/Menu/Menu';
import Navbar from './components/Navbar/Navbar';
import Reservation from './components/Reservation/Reservation';
import Home from './pages/Home/Home';
import Facility from './components/Facility/Facility';
import StaffRoutes from './components/Staff/StaffRoutes';
import Offer from './components/Offers/Offer';
import Deals from './components/Offers/Deals';
import Query from './components/Query/Query';
import CustomerRoutes from './components/Customer/CustomerRoutes';


function App() {
  const location = useLocation();

  const shouldShowFooter = location.pathname === ('/customer');


  const shouldShowNavbar = !location.pathname.startsWith('/admin') &&
    !location.pathname.startsWith('/staff') &&
    !location.pathname.startsWith('/customer') &&
    !location.pathname.startsWith('/order') &&
    location.pathname !== '/cart';

  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className="App">
        {shouldShowNavbar && <Navbar setShowLogin={setShowLogin} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/about' element={<About />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/facility' element={<Facility />} />
          <Route path='/reservation' element={<Reservation />} />
          <Route path='/offer' element={<Offer />} />
          <Route path='/deals' element={<Deals />} />
          <Route path='/query' element={<Query />} />
        </Routes>
        <AdminRoutes />
        <StaffRoutes />
        <CustomerRoutes />
      </div>
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;
