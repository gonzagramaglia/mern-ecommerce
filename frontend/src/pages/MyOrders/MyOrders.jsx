import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./MyOrders.css";
import axios from "axios";
import { assets } from "../../assets/assets.js";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    const res = await axios.get(url + "/api/order/userorders", {
      headers: { token },
    });

    if (res.data.success) {
      setData(res.data.data);
      console.log(res.data.data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <>
      <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
          {data.map((order, index) => {
            return (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="box icon" />
                <p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " (x" + item.quantity + ")";
                    } else {
                      return item.name + " (x" + item.quantity + "), ";
                    }
                  })}
                </p>
                <p className="amount">{order.amount} ARS</p>
                <p>Items: {order.items.length}</p>
                <p>
                  <span>&#x25cf;</span>
                  <b>{order.status}</b>
                </p>
                <button
                  onClick={() => {
                    fetchOrders();
                    toast.success("Orders status updated");
                  }}
                >
                  Track Order
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
