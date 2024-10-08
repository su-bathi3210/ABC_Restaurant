import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
            <h2>Order Your</h2>
            <h3>Favorite Food Here</h3>
            <p>Choose from a diverse menu featuring a delectable array of dishes ingredients and culinary expertise. Our mission is to satisfy your cravings a dining experience, one delicious meal at a time.</p>
            <Link to="/menu"><button>View Menu</button></Link>
        </div>
    </div>
    
  )
}
