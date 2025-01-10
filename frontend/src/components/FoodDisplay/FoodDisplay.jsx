import "./FoodDisplay.css";
import { useContext } from "react";
import { StoreContext as Store } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { foodList } = useContext(Store);

  return (
    <>
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
          {foodList.map((food_item, index) => {
            if (category === "All" || category === food_item.category) {
              return (
                <FoodItem
                  key={index}
                  id={food_item._id}
                  name={food_item.name}
                  description={food_item.description}
                  price={food_item.price}
                  image={food_item.image}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default FoodDisplay;
