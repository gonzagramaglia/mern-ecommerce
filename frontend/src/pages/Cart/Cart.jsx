import "./Cart.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { url, cartItems, foodList, removeFromCart, getTotalCartAmount } =
    useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {foodList.map((item, index) => {
            if (cartItems[item._id] > 0) {
              const item_quantity = cartItems[item._id];

              return (
                <>
                  <div className="cart-items-title cart-items-item" key={index}>
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                    <p>{item.price} ARS</p>
                    <p>{item_quantity}</p>
                    <p>{item.price * item_quantity} ARS</p>
                    <img
                      onClick={() => removeFromCart(item._id)}
                      className="cross"
                      src={assets.cross_icon}
                    />
                  </div>
                  <hr />
                </>
              );
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()} ARS</p>
              </div>
              <hr />

              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount() === 0 ? 0 : 300} ARS</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 300}{" "}
                  ARS
                </b>
              </div>
            </div>
            <button
              onClick={() => navigate("/order")}
              disabled={getTotalCartAmount() === 0}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="PROMOCODE" />
                <button onClick={() => toast.error("Invalid promo code")}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="/header_img.png" className="main-dish" />
    </>
  );
};

export default Cart;
