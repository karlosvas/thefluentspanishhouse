import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Publication from "@/pages/Publication";
import Error from "@/pages/404";
import Account from "@/pages/Account";
import Blog from "@/pages/Blog";
import AboutMe from "@/pages/AboutMe";
import Info from "@/pages/Info";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import { createContext, useEffect, useState } from "react";
import Newsetler from "@/pages/Newsletter";
import CallbackVerify from "@/pages/CallbackVerify";
import {
  getAuth,
  onAuthStateChanged,
  onIdTokenChanged,
  User,
} from "firebase/auth";
import SingleTheme from "@/components/header-components/SingleTheme";
import Contact from "@/pages/Contact";
import { Toaster } from "react-hot-toast";
import Main from "./pages/Main";
import { HelmetProvider } from "react-helmet-async";
import AdminPanel from "./layouts/AdminPanel";

export const UserContext = createContext<User | null>(null);

const App = () => {
  // Usuario actual
  const [user, setUser] = useState<User | null>(null);
  // Página de carga
  const [loading, setLoading] = useState(false);
  // Estado para saber si el usuario actual es administrador

  const auth = getAuth();
  const location = useLocation();
  const exclude_header = ["/info", "/404", "/verify"];
  const isAdmin = import.meta.env.VITE_ADMINS.split(",").includes(
    user?.email?.split("@")[0]
  );

  // Determina si el Header y el Footer deben ser ocultados
  const shouldHideHeaderFooter = exclude_header.includes(location.pathname);

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
          localStorage.setItem("token", token);
          // Almacena el usuario en el estado
          setUser(user);
          // Actualiza el estado del usuario administrador si el usuario actual es administrador
        } catch (error) {
          console.error("Error updating ID token:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      } else {
        // Si no hay usuario, elimina el token de localStorage y actualiza el estado del usuario
        localStorage.removeItem("token");
        setUser(null);
      }
      setLoading(true);
    });

    // Listener que detecta cambios en el token de ID del usuario
    const unsubscribeToken = onIdTokenChanged(auth, async (user) => {
      if (user) {
        try {
          // Obtén el token de ID del usuario autenticado
          const token = await user.getIdToken();
          // Almacena el token en localStorage
          localStorage.setItem("token", token);
        } catch (error) {
          console.error("Error updating ID token:", error);
          localStorage.removeItem("token");
        }
      } else {
        localStorage.removeItem("token");
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
        <HelmetProvider>
          {!shouldHideHeaderFooter ? <Header /> : <SingleTheme />}
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/publication/:id" element={<Publication />} />
            <Route path="/account" element={<Account />} />
            <Route path="/blog/:page" element={<Blog />} />
            <Route path="/aboutme" element={<AboutMe />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/info" element={<Info />} />
            <Route path="/newsetler" element={<Newsetler />} />
            <Route path="/404" element={<Error />} />
            <Route path="/verify" element={<CallbackVerify />} />
            {/* Maneja rutas no encontradas */}
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
          {isAdmin && <AdminPanel />}
          {!shouldHideHeaderFooter && <Footer />}
          <Toaster position="bottom-right" />
        </HelmetProvider>
      </UserContext.Provider>
    );
  }
  return null;
};

export default App;
