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
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Facility from './components/Facility/Facility';
import StaffRoutes from './components/Staff/StaffRoutes';
import Offer from './components/Offers/Offer';
import Deals from './components/Offers/Deals';
import Query from './components/Query/Query';


function App() {
  const location = useLocation();

  const shouldShowFooter = location.pathname === '/';


  const shouldShowNavbar = !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/staff');

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
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/offer' element={<Offer />} />
          <Route path='/deals' element={<Deals />} />
          <Route path='/query' element={<Query />} />
        </Routes>
        <AdminRoutes />
        <StaffRoutes />
      </div>
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;
