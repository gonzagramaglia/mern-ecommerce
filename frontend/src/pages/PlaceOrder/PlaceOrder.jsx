import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodList, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    zipcode: "",
    street: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // place order
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("First you have to sign in!");
      return;
    }
    let orderItems = [];
    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 300,
    };
    const res = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });
    if (res.data.success) {
      const { session_url } = res.data;
      window.location.replace(session_url);
    } else {
      alert("Error");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="place-order">
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              onChange={handleChange}
              name="firstName"
              value={data.firstName}
              type="text"
              placeholder="First Name"
              required
            ></input>
            <input
              onChange={handleChange}
              name="lastName"
              value={data.lastName}
              type="text"
              placeholder="Last Name"
              required
            ></input>
          </div>
          <input
            onChange={handleChange}
            name="phone"
            value={data.phone}
            type="text"
            placeholder="Phone"
            required
          />
          <input
            onChange={handleChange}
            name="email"
            value={data.email}
            type="email"
            placeholder="Email"
            required
          />
          <div className="multi-fields">
            <input
              onChange={handleChange}
              name="country"
              value={data.country}
              type="text"
              placeholder="Country"
              required
            ></input>
            <input
              onChange={handleChange}
              name="city"
              value={data.city}
              type="text"
              placeholder="City"
              required
            ></input>
          </div>
          <div className="multi-fields">
            <input
              onChange={handleChange}
              name="zipcode"
              value={data.zipcode}
              type="text"
              placeholder="ZIP Code"
              required
            ></input>
            <input
              onChange={handleChange}
              name="street"
              value={data.street}
              type="text"
              placeholder="Street"
              required
            ></input>
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
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </form>
      <img src="/header_img.png" className="main-dish" />
    </>
  );
};

export default PlaceOrder;
