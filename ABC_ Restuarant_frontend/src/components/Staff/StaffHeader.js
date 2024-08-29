import React from 'react'
import { Link } from 'react-router-dom';
import './Staff.css'

export const StaffHeader = () => {
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Order Your</h2>
                <h3>Favorite Food Here</h3>
                <p>Choose from a diverse menu featuring a delectable array of dishes ingredients and culinary expertise. Our mission is to satisfy your cravings a dining experience, one delicious meal at a time.</p>
                <Link to="/staff-orders"><button>Orders</button></Link>
            </div>
        </div>

    )
}

export default StaffHeader;
