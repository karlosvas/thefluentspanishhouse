import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useRef } from "react";
import "../styles/layouts/404.css";

export const Error = () => {
  const errorShownRef = useRef(false);

  useEffect(() => {
    if (!errorShownRef.current) {
      errorShownRef.current = true;
      toast.error("Error al cargar la página");
    }
  }, []);

  return (
    <>
      <div className="error">
        <section>
          <h1>Error 404</h1>
          <Link to="/">Go Home</Link>
        </section>
        <p>
          Si crees que es debido a un bug o error abre una Issue en Github
          <a
            href="https://github.com/karlosvas/thefluentspanishhouse/issues"
            target="blank"
          >
            <strong> @karlosvas/thefluentspanishhouse ❤️</strong>
          </a>
          <br />
          Opcionalmente envia un correo a carlosvassan@gmail.com
        </p>
      </div>
      <Toaster />
    </>
  );
};

export default Error;
