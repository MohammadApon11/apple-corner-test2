import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { UtilesContextProvider } from "./context/UtilesContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UtilesContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </UtilesContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
