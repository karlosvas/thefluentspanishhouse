import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Publication from '@/pages/Publication';
import Error from '@/pages/404';
import Account from '@/pages/Account';
import Blog from '@/pages/Blog';
import AboutMe from '@/pages/AboutMe';
import Info from '@/pages/Info';
import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import { createContext, useEffect, useState } from 'react';
import Newsetler from '@/pages/Newsletter';
import CallbackVerify from '@/pages/CallbackVerify';
import {
  getAuth,
  onAuthStateChanged,
  onIdTokenChanged,
  User,
} from 'firebase/auth';
import Contact from '@/pages/Contact';
import { Toaster } from 'react-hot-toast';
import Main from './pages/Main';
import { HelmetProvider } from 'react-helmet-async';
import AdminPanel from './layouts/AdminPanel';
import Theme from './components/header-components/Theme';
import { getAdmin, getTheme } from './utils/utilities';
import { type ThemeContextType } from 'types/types';
import { initializeUrls } from './constants/global';

// Define los tipos de los contextos
export const UserContext = createContext<User | null>(null);
export const ThemeContext = createContext<ThemeContextType | null>(null);

const App = () => {
  // Usuario actual
  const [user, setUser] = useState<User | null>(null);
  // Página de carga
  const [loading, setLoading] = useState(false);
  // Tema actual oscuro o claro
  const [theme, setTheme] = useState<string>(getTheme());
  // Auth de Firebase y localizacion actual
  const auth = getAuth();
  const location = useLocation();

  // Determina si el Header y el Footer deben ser ocultados
  const exclude_header = ['/info', '/404', '/verify'];
  const shouldHideHeaderFooter = exclude_header.includes(location.pathname);

  // Cambiar el tema en localstorage cada vez que se cambie
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme);
    else setTheme('light');
  }, [setTheme]);

  // Cambiar el tema en el DOM cada vez que se cambie
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll hacia arriba cuando se cambia de ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Listener que verifica si el usuario está autenticado y detecta cambios en el token de ID del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Obtén el token de ID del usuario autenticado
          const token = await user.getIdToken();
          // Almacena el token en localStorage
          localStorage.setItem('token', token);
          // Almacena el usuario en el estado
          setUser(user);
          // Actualiza el estado del usuario administrador si el usuario actual es administrador
        } catch (error) {
          console.error('Error updating ID token:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      } else {
        // Si no hay usuario, elimina el token de localStorage y actualiza el estado del usuario
        localStorage.removeItem('token');
        setUser(null);
      }
      await initializeUrls();
      setLoading(true);
    });

    // Listener que detecta cambios en el token de ID del usuario
    const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
      if (user) {
        try {
          // Obtén el token de ID del usuario autenticado
          const token = await user.getIdToken();
          // Almacena el token en localStorage
          localStorage.setItem('token', token);
        } catch (error) {
          console.error('Error updating ID token:', error);
          localStorage.removeItem('token');
        }
      } else {
        localStorage.removeItem('token');
      }
    });

    return () => {
      unsubscribe();
      unsubscribeToken();
    };
  }, [auth]);

  if (loading) {
    return (
      <UserContext.Provider value={user}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <HelmetProvider>
            {/* Si no se renderiza en su lugar se muestra el icono de cambiar thema */}
            {!shouldHideHeaderFooter ? (
              <Header />
            ) : (
              <span className="single-theme">
                <Theme />
              </span>
            )}
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/publication/:id" element={<Publication />} />
              <Route path="/account" element={<Account />} />
              <Route path="/blog/:page" element={<Blog />} />
              <Route path="/aboutme" element={<AboutMe />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/info" element={<Info />} />
              <Route path="/newsletter" element={<Newsetler />} />
              <Route path="/404" element={<Error />} />
              <Route path="/verify" element={<CallbackVerify />} />
              {/* Maneja rutas no encontradas */}
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
            {getAdmin(user) && user?.email == 'carlosvassan@gmail.com' && (
              <AdminPanel />
            )}
            {!shouldHideHeaderFooter && <Footer />}
            <Toaster position="bottom-right" />
          </HelmetProvider>
        </ThemeContext.Provider>
      </UserContext.Provider>
    );
  }
  return null;
};

export default App;
