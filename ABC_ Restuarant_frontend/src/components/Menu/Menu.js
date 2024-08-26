import React, { useState } from 'react';
import './Menu.css';
import { menu_list } from '../../assets/assets';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const Menu = () => {
    const [category, setCategory] = useState("All");

    return (
        <div className='menu' id='menu'>
            <h1>Explore Our Menu</h1>
            <p className='menu-text'>
                Welcome to a culinary journey where tradition meets innovation. Our carefully curated menu offers a diverse selection of dishes designed to satisfy every palate. Whether you're in the mood for something light and refreshing or hearty and comforting, our offerings range from timeless classics to contemporary creations. Each dish is prepared with the finest ingredients, emphasizing fresh, local produce, and the rich, bold flavors that define our cuisine.
            </p>

            <div className="menu-list">
                {menu_list.map((item, index) => (
                    <div
                        onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                        key={index}
                        className='menu-list-item'
                    >
                        <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt='' />
                        <p>{item.menu_name}</p>
                    </div>
                ))}
            </div>
            <hr />

            <FoodDisplay category={category} />

            <footer className="about-footer">
                <p>&copy; 2024 Our Restaurant. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Menu;
