import "./LoginPopup.css";
import { useState, useRef, useEffect, useContext } from "react";
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ showLogin, setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { url, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currentState === "Sign Up") {
      newUrl += "/api/user/register";
    } else {
      newUrl += "/api/user/login";
    }
    try {
      const res = await axios.post(newUrl, data);

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setShowLogin(false);
        if (currentState === "Sign Up") {
          toast.success("User created");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowLogin(false);
    }
  };

  useEffect(() => {
    if (showLogin) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showLogin]);

  if (!showLogin) return null;

  return (
    <>
      <div className="login-popup">
        <form
          onSubmit={handleSubmit}
          className="login-popup-form"
          ref={popupRef}
        >
          <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img src={assets.cross_icon} onClick={() => setShowLogin(false)} />
          </div>
          <div className="login-popup-inputs">
            {currentState === "Sign Up" ? (
              <>
                <label htmlFor="name">Your Name:</label>
                <input
                  onChange={handleChange}
                  value={data.name}
                  name="name"
                  type="text"
                  placeholder="Name"
                  id="name"
                  required
                />
              </>
            ) : null}
            <label htmlFor="email">Your Email:</label>
            <input
              onChange={handleChange}
              value={data.email}
              name="email"
              type="email"
              placeholder="Email"
              id="email"
              required
            />
            <label htmlFor="password">Your Password:</label>

            <input
              onChange={handleChange}
              value={data.password}
              name="password"
              type="password"
              id="password"
              placeholder={
                currentState === "Sign Up" ? "Password" : "**********"
              }
              required
            />
          </div>
          <button type="submit">
            {currentState === "Sign Up" ? "Create Account" : "Login"}
          </button>
          {currentState === "Sign Up" ? (
            <>
              <div className="login-popup-condition">
                <input type="checkbox" id="check" required />
                <label htmlFor="check">
                  By continuing, I agree to the terms of use & privacy policy
                </label>
              </div>
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setCurrentState("Sign In");
                    setData({ name: "", email: "", password: "" });
                  }}
                >
                  Click here
                </span>
              </p>
            </>
          ) : (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => {
                  setCurrentState("Sign Up");
                  setData({ name: "", email: "", password: "" });
                }}
              >
                Click here
              </span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopup;
