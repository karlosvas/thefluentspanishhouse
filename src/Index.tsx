import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.tsx";
import i18next from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";
import "./styles/index.css";
import { BrowserRouter } from "react-router-dom";

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
