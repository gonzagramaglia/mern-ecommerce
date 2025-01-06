import "./LoginPopup.css";
import { useState, useRef, useEffect } from "react";
import { assets } from "../../assets/assets.js";

const LoginPopup = ({ showLogin, setShowLogin }) => {
  const [currentState, setCurrentState] = useState("Sign Up");
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
        <form className="login-popup-form" ref={popupRef}>
          <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img src={assets.cross_icon} onClick={() => setShowLogin(false)} />
          </div>
          <div className="login-popup-inputs">
            {currentState === "Sign Up" ? (
              <>
                <label htmlFor="name">Your Name:</label>
                <input type="text" placeholder="Name" id="name" required />
              </>
            ) : null}
            <label htmlFor="email">Your Email:</label>
            <input type="email" placeholder="Email" id="email" required />
            <label htmlFor="password">Your Password:</label>

            <input
              type="password"
              id="password"
              placeholder={
                currentState === "Sign Up" ? "Password" : "**********"
              }
              required
            />
          </div>
          <button>
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
                <span onClick={() => setCurrentState("Sign In")}>
                  Click here
                </span>
              </p>
            </>
          ) : (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopup;
