import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [foodList, setFoodList] = useState([]);
  const url = "https://mern-ecommerce-backend-0a90.onrender.com";
  const [token, setToken] = useState("");

  const fetchFoodList = async () => {
    const res = await axios.get(url + "/api/food/list");
    setFoodList(res.data.data);
  };

  const loadCartData = async (token) => {
    const res = await axios.get(url + "/api/cart/get", { headers: { token } });
    setCartItems(res.data.cartData);
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    };
    loadData();
  }, []);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = { ...prev };

      // Decrease the item count
      updatedCart[itemId] -= 1;

      // Remove the item if its count reaches 0
      if (updatedCart[itemId] === 0) {
        delete updatedCart[itemId];
      }

      return updatedCart;
    });

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    // Check if cartItems is a valid object
    if (typeof cartItems !== "object" || cartItems === null) {
      console.error("cartItems must be a valid object");
      return totalAmount;
    }

    for (const item in cartItems) {
      // Ensure the value of cartItems[item] is a positive number
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);

        // Check if the product is found in foodList and if the price is a valid number
        if (itemInfo && typeof itemInfo.price === "number") {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.warn(`Product with ID ${item} not found or invalid price`);
        }
      }
    }

    return totalAmount;
  };

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
