import "./Footer.css";
import { assets } from "../../assets/assets.js";

const Footer = () => {
  return (
    <>
      <div className="footer" id="footer">
        <div className="footer-content">
          <div className="footer-content-left">
            <a href="/">
              <img src={assets.logo} alt="logo" />
            </a>
          </div>
          <div className="footer-links">
            <div className="footer-content-center">
              <h2>SHOWCASE</h2>
              <ul>
                <li>
                  <a
                    href="https://www.gonza.gr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Frontend Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@gonzagramaglia/videos"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Backend Portfolio
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-content-right">
              <h2>SOCIAL</h2>
              <ul>
                <li>
                  <a
                    href="https://github.com/gonzagramaglia"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/gonzagramaglia/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <hr /> */}
        <div className="footer-footer">
          <p className="footer-copyright">© 2025 Gonzalo Gramaglia</p>
          <div>
            <a
              href="https://github.com/gonzagramaglia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="github" src={assets.github_icon} alt="github" />
            </a>
            <a
              href="https://www.linkedin.com/in/gonzagramaglia/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="linkedin"
                src={assets.linkedin_icon}
                alt="linkedin"
              />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
