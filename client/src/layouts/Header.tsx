import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Hamburger from '@/components/header-components/Hamburger';
import Auth from '@/components/header-components/Auth';
import Exit from '@/components/svg-component/Exit';
import MainNav from '@/components/header-components/MainNav';
import Theme from '@/components/header-components/Theme';
import Settings from '@/components/svg-component/Settings';
import '@/styles/layouts/header.css';
import { Link } from 'react-router-dom';
import { handleClickNavigate } from '@/utils/navigate';

const Header = () => {
  const [isShrunk, setIsShrunk] = useState<boolean>(false);

  // Manejar el scroll para cambiar el tamaño del header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Uri actual
  const location = useLocation();
  // Navegación
  const navigate = useNavigate();

  return (
    <header className={isShrunk ? 'shrink' : ''}>
      <div className="header-animation">
        <section id="sect">
          <div className="waves">
            <div className="wave" id="wave1"></div>
            <div className="wave" id="wave2"></div>
            <div className="wave" id="wave3"></div>
            <div className="wave" id="wave4"></div>
          </div>
        </section>
        <div className="header">
          {window.innerWidth >= 766 ? (
            <Link to="/" onClick={handleClickNavigate('/', navigate)}>
              <img
                src="/logos/logo.webp"
                alt="fluent spanish house logo"
                id="logo"
              />
            </Link>
          ) : (
            <Hamburger />
          )}
          {window.innerWidth > 766 ? (
            <MainNav />
          ) : (
            window.innerWidth <= 766 &&
            location.pathname !== '/' && (
              <Exit optionalClass="exit-publication" />
            )
          )}
          {window.innerWidth > 766 && (
            <div className="nav-icons">
              <Settings />
              <Theme />
              <Auth />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
