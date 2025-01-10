import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Estilos globales
import App from "./App"; // Archivo principal de la aplicación

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
