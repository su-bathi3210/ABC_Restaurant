import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Customer from '../../assets/Customer.png';
import cartIcon from '../../assets/basket_icon.png';
import { StoreContext } from '../StoreContext/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const { getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();
    const [signOutSuccess, setSignOutSuccess] = useState(false);

    const handleSignOut = () => {
        setSignOutSuccess(true);

        setTimeout(() => {
            navigate('/');
            setSignOutSuccess(false);
        }, 2000);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <a href="/" className="navbar-logo">
                        <Link to='/customer'>
                            <img src={Customer}
                                style={{ marginLeft: '-65.6px' }}
                                alt="Customer Logo" className="logo-image" />
                        </Link>
                    </a>
                    <ul className="navbar-menu" style={{ marginLeft: '50px' }}>
                        <li><a href="/customer" className="navbar-item">Home</a></li>
                        <li><a href="/customer-menu" className="navbar-item">Menu</a></li>
                        <li><a href="/customer-gallery" className="navbar-item">Gallery</a></li>
                        <li><a href="/customer-facility" className="navbar-item">Facility</a></li>
                        <li><a href="/customer-reservation" className="navbar-item">Reservation</a></li>
                        <li><a href="/customer-query" className="navbar-item">Query</a></li>
                        <li><a href="/customer-contact" className="navbar-item">Contact</a></li>
                    </ul>
                    <div className="navbar-auth">
                        <a href="/cart" className="cart-button">
                            <Link to='/cart'>
                                <img src={cartIcon} alt="Cart" className="cart-icon" />
                            </Link>
                            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                        </a>


                        <button onClick={handleSignOut} alt="Sign Out Button">Sign Out</button>
                    </div>
                </div>
            </nav>

            {signOutSuccess && (
                <div className="sign-out-message">
                    <p>Sign out successful!</p>
                </div>
            )}
        </>
    );
}

export default Navbar;
