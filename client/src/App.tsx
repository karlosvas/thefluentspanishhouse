import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Publications from "@/pages/Publications";
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
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import SingleTheme from "@/components/header-components/SingleTheme";
import Contact from "@/pages/Contact";
import { Toaster } from "react-hot-toast";
import Main from "./pages/Main";

export const UserContext = createContext<User | null>(null);

const App = () => {
  // Usuario actual
  const [user, setUser] = useState<User | null>(null);
  // Index cargado o no
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const location = useLocation();
  const exclude_header = ["/info", "/404", "/verify"];

  // Determina si el Header y el Footer deben ser ocultados
  const shouldHideHeaderFooter = exclude_header.includes(location.pathname);

  // Scroll hacia arriba cuando se cambia de ruta
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Listener que verifica si el usuario está autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(true);
    });
    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <UserContext.Provider value={user}>
        {!shouldHideHeaderFooter ? <Header /> : <SingleTheme />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/publication/:id" element={<Publications />} />
          <Route path="/account" element={<Account />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/info" element={<Info />} />
          <Route path="/newsetler" element={<Newsetler />} />
          <Route path="/404" element={<Error />} />
          <Route path="/verify" element={<CallbackVerify />} />
          {/* Maneja rutas no encontradas */}
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
        {!shouldHideHeaderFooter && <Footer />}
        <Toaster position="bottom-right" />
      </UserContext.Provider>
    );
  }
  return null;
};

export default App;
