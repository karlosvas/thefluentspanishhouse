import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import i18n from "i18next";
import { BrowserRouter } from "react-router-dom";
import "./styles/layouts/index.css";
import { I18nextProvider, initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const url_api =
  import.meta.env.VITE_VERCEL_ENV === "production"
    ? `https://thefluentspanishhouse-server.vercel.app`
    : import.meta.env.VITE_VERCEL_ENV === "preview"
    ? `https://${import.meta.env.VITE_VERCEL_URL}-server`
    : "http://localhost:3001";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    preload: ["en", "es"],
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
  .catch((error) => {
    console.error("i18next initialization failed", error);
  });
