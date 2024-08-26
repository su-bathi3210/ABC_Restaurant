import React, { useContext } from 'react';
import { StoreContext } from '../StoreContext/StoreContext';
import './FoodDisplay.css';
import { FoodItem } from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { food_list = [] } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top Dishes Near You</h2>
      <div className='food-display-list'>
        {food_list.length > 0 ? (
          food_list
            .filter(item => category === 'All' || category === item.category)
            .map((item) => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))
        ) : (
          <p>No dishes available.</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
