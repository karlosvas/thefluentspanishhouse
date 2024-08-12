import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import "../styles/404.css";

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
          If you think it's due to a bug or error, open an Issue on Github
          <a
            href="https://github.com/karlosvas/thefluentspanishhouse/issues"
            target="blank"
          >
            <strong> @karlosvas/thefluentspanishhouse ❤️</strong>
          </a>
          <br />
          Optionally, you can send an email to carlosvassan@gmail.com"
        </p>
      </div>
    </>
  );
};

export default Error;
