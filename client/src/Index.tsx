import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { setupAuthPersistence } from "../src/scripts/oauth2-0.tsx"; // Asegúrate de ajustar la ruta según tu estructura
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

setupAuthPersistence()
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  })
  .catch((e) => console.error(e));
