<<<<<<< HEAD
// In your main JS/TS entry file (like src/index.js or src/main.tsx)
import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
=======
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
>>>>>>> c346b7278c7734c3440dd9eb5ba90e012003a34a

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);