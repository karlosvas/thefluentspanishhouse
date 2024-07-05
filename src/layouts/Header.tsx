import { useState, useEffect } from 'react';
import Auth from '../components/Auth';
import Languajes from '../components/Languajes';

function Header() {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        // Al cargar la aplicación, verifica si hay un tema guardado en localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
        setTheme(savedTheme);
        } else {
        // Si no hay tema guardado, usa el esquema de color preferido del sistema
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDarkMode ? 'dark' : 'light');
        }
    }, []);

    useEffect(() => {
        // Aplicar la clase de tema al <html> cuando cambie el estado del tema
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);

        // Guardar el tema seleccionado en localStorage para persistencia
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };


    return (
      <>
        <header>
            <div>
                <img src="/img/logo.png" alt="fluent spanish house logo" id='logo'/>
            </div>
            <nav>
                <ul>
                    <li>Blog</li>
                    <li>Reviews</li>
                    <li>Contact</li>
                </ul>
            </nav>
            <div className="auth">
                <Languajes />
                <svg onClick={toggleTheme} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="svgIcon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
                <div className="auth">
                    <Auth />
                </div>
            </div>
        </header>
      </>
    )
}

export default Header

