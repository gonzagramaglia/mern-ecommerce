import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { url, cartItems, addToCart, removeFromCart } =
    useContext(StoreContext);

  return (
    <>
      <div className="food-item">
        <div className="food-item-img-container">
          <img className="food-item-image" src={image} alt={name} />
          {cartItems[id] === undefined || cartItems[id] === 0 ? (
            <img
              className="add"
              onClick={() =>
                addToCart(id)
              } /* setItemCount((prev) => prev + 1) */
              src={assets.add_icon_white}
              alt="add item"
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() =>
                  removeFromCart(id)
                } /* setItemCount((prev) => prev - 1) */
                src={assets.remove_icon_red}
                alt="remove item"
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={() =>
                  addToCart(id)
                } /* setItemCount((prev) => prev + 1) */
                src={assets.add_icon_green}
                alt="add another item"
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_stars} alt="stars" />
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">{price} ARS</p>
        </div>
      </div>
    </>
  );
};

export default FoodItem;
