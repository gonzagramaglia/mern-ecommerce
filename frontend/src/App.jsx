import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import AppDownload from "./components/AppDownload/AppDownload";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      <ToastContainer />
      {showLogin ? (
        <>
          <LoginPopup showLogin={showLogin} setShowLogin={setShowLogin} />
        </>
      ) : null}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Routes>
        <AppDownload />
      </div>
      <Footer />
    </>
  );
};

export default App;
