import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/" className="active">
          home
        </Link>
        <a href="#app" className="inactive">
          app
        </a>
      </ul>
      <div className="navbar-right">
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {token ? (
          <>
            <div className="navbar-profile">
              <img
                src={assets.profile_icon}
                alt="profile icon"
                className="navbar-profile-icon"
              />
              <ul className="navbar-profile-dropdown">
                <li>
                  <img src={assets.bag_icon} alt="orders" />
                  <p>Orders</p>
                </li>
                <hr />
                <li onClick={() => logout()}>
                  <img src={assets.logout_icon} />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
