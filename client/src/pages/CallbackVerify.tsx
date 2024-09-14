import {
  Link,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  changeOptionsUserEmail,
  delateUserFirebase,
  resetPassword,
} from "@/scripts/firebase-options-users";
import toast from "react-hot-toast";
import ShowPassword from "@/components/reusable/ShowPassword";
import { UserContext } from "@/App";
import { showMessageErrorFirebase } from "@/scripts/firebase-config";
import { Helmet } from "react-helmet-async";

export const CallbackVerify = () => {
  // Repuesta del usuario
  const [response, setResponse] = useState("");
  // Datos del formulario
  const [ID, setID] = useState({
    username: "",
    password: "",
    email: "",
  });

  // Navegar entre rutas
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();
  const { email, del } = location.state || {};
  const { reset } = location.state || {};

  // Usuario actual
  const user = useContext(UserContext);

  // Enviar datos para verificar email
  async function submitDataVerifyEmail(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if(user && email){
      try {
        // Si el usuario y el nuevo email existen se cambia el email
        if (user && email)
          await changeOptionsUserEmail(ID.password, navigate, email, user);
        else throw new Error();
      } catch (error) {
        showMessageErrorFirebase(error);
      }
    } else if(reset){
      await resetPassword(response, navigate).catch((error) => showMessageErrorFirebase(error));
    } else {
      navigate("/404");
    }
  }

  async function submitDelateUser() {
    if (response !== "DELETE ACCOUNT")
      return toast.error("You must type DELETE ACCOUNT to proceed");
    try {
      // Si el usuario existe se elimina
      if (user) await delateUserFirebase(user, ID.password, navigate);
      else throw new Error();
    } catch (error) {
      showMessageErrorFirebase(error);
    }
  }

  useEffect(() => {
    if (!email && !reset) navigate("/404");
  }, [email,reset, navigate]);

  return (
    <>
      <Helmet>
        <title>Verify</title>
        <meta
          name="description"
          content="Verify your email or delete your user from The Fluent Spanish House."
        />
      </Helmet>
      <div className="error">
        {del ? (
          <>
            <section className="err-flex">
              <h1>
                Are you sure you want to delete your user from The Fluent
                Spanish House?
              </h1>
              <small>
                Please type <strong>DELETE ACCOUNT</strong> if you want to
                proceed
              </small>
              <small>And type ypur password acount</small>
              <Link to="/">Go Home</Link>
            </section>
            <section>
              <form>
                <label htmlFor="username">
                  Write here
                  <input
                    type="text"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                  />
                </label>
                <label htmlFor="password">
                  <ShowPassword password={ID.password} setID={setID} />
                </label>
              </form>
            </section>
            <button type="submit" onClick={submitDelateUser}>
              I CONFIRM THAT I WANT TO DELETE THE USER
            </button>
          </>
        ) : !reset ? (
          <>
            <section className="err-flex">
              <h1>Please enter your password to change to your email</h1>
              <Link to="/">Go Home</Link>
            </section>

            <form onSubmit={submitDataVerifyEmail}>
              <label>
                <ShowPassword password={ID.password} setID={setID} />
              </label>
              <button type="submit">Send</button>
            </form>
          </>
        ):(
          <>
            <section className="err-flex">
              <h1>Please enter your email to change to your password</h1>
              <Link to="/">Go Home</Link>
            </section>

            <form onSubmit={submitDataVerifyEmail}>
            <label htmlFor="username">
                  Email
                  <input
                    type="text"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                  />
                </label>
              <button type="submit" className="send-info">Send</button>
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default CallbackVerify;
