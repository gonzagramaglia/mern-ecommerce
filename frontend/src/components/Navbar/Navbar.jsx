import { assets } from "../../assets/assets";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="logo" className="logo" />
      <ul className="navbar-menu">
        <Link to="/" className="active">
          home
        </Link>
        <a href="#explore-menu" className="inactive">
          menu
        </a>
        <a href="#app" className="inactive">
          app
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search icon" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
