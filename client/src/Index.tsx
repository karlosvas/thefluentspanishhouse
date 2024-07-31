import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { setupAuthPersistence } from "../src/scripts/oauth2-0.tsx"; // Ajusta la ruta según tu estructura
import { loadPublications } from "./scripts/render-data.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.css";
import { type PublicationCardType } from "../types/types";

const initializeApp = async () => {
  try {
    const publications: PublicationCardType[] = await loadPublications();
    await setupAuthPersistence();

    // Renderiza la aplicación después de que ambas promesas se hayan completado
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <BrowserRouter>
          <App publications={publications} />
        </BrowserRouter>
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

// Llama a la función para iniciar el proceso
initializeApp();
