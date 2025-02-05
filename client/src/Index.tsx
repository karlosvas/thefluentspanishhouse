import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { setupAuthPersistence } from '@/services/firebase-config.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/index.css';
import '@/styles/reusables/close.css';

const initializeApp = async () => {
  try {
    await setupAuthPersistence();

    // Renderiza la aplicación después de que ambas promesas se hayan completado
    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Error during initialization:', error);
  }
};

// Llama a la función para iniciar el proceso
initializeApp();
