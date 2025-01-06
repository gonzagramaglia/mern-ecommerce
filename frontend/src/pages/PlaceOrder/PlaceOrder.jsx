import { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <>
      <form className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input type="text" placeholder="First Name"></input>
            <input type="text" placeholder="Last Name"></input>
          </div>
          <input type="text" placeholder="Phone" />
          <input type="email" placeholder="Email" />
          <div className="multi-fields">
            <input type="text" placeholder="Country"></input>
            <input type="text" placeholder="City"></input>
          </div>
          <div className="multi-fields">
            <input type="text" placeholder="ZIP Code"></input>
            <input type="text" placeholder="Street"></input>
          </div>
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()} pesos</p>
              </div>
              <hr />

              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>{getTotalCartAmount() === 0 ? 0 : 2} pesos</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}{" "}
                  pesos
                </b>
              </div>
            </div>
            <button>PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
      <img src="/header_img.png" className="main-dish" />
    </>
  );
};

export default PlaceOrder;
