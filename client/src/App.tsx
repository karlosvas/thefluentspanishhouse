import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Main from "./pages/Main";
import Publications from "./pages/Publications";
import Error from "./pages/404";
import Account from "./pages/Account";
import Blog from "./pages/Blog";
import AboutMe from "./pages/AboutMe";
import Contact from "./pages/Contact";
import Info from "./pages/Info";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import { type PublicationsProp } from "../types/types";
import { useEffect } from "react";
// import Newsetler from './pages/Newsetler'; // Descomentar si se necesita

const App: React.FC<PublicationsProp> = ({ publications }) => {
  const location = useLocation();
  const exclude = ["/info", "/404"];

  // Determina si el Header y el Footer deben ser ocultados
  const shouldHideHeaderFooter = exclude.includes(location.pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/publication/:id" element={<Publications />} />
        <Route path="/account" element={<Account />} />
        <Route path="/blog" element={<Blog publications={publications} />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/info" element={<Info />} />
        <Route path="/404" element={<Error />} />
        {/* Maneja rutas no encontradas */}
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
};

export default App;
