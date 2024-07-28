import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import i18n from "i18next";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider, initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { setupAuthPersistence } from "../src/scripts/oauth2-0.tsx"; // Asegúrate de ajustar la ruta según tu estructura
import { url_api } from "./constants/global.ts";
import "./styles/index.css";
import "bootstrap/dist/css/bootstrap.min.css";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    preload: ["en"],
    ns: ["global"],
    defaultNS: "global",
    backend: {
      loadPath: `${url_api}/api/translations/{{lng}}/{{ns}}`,
    },
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    return setupAuthPersistence();
  })
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </I18nextProvider>
      </React.StrictMode>
    );
  })
  .catch((e) => console.error(e));
