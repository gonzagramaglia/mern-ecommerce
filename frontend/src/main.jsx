import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import Context from "./context/StoreContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Context>
      <App />
    </Context>
  </Router>
);
