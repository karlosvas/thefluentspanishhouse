import { ChangeEvent, useRef, useState } from "react";
import {
  signInWithGoogle,
  registerWithGoogle,
  signOutUser,
  isLogged,
  localRegister,
  localSignin,
} from "../scripts/oauth2-0";
import toast, { Toaster } from "react-hot-toast";
import { toogleFormType } from "../scripts/modal";
import Button from "./Buuton";
import "../styles/main/modalAuth.css";
import { type AuthProps, type Translations } from "../../types/types";

const Auth: React.FC<Translations & AuthProps> = ({
  translation,
  onLoginChange,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("login");
  const [ID, setUser] = useState({
    username: "",
    password: "",
    email: "",
  });
  const logRef = useRef<HTMLButtonElement>(null);
  const typeLoginRegisterRef = useRef<HTMLHeadingElement>(null);
  const buttons: string[] = translation("buttons", { returnObjects: true });

  const authLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeLoginRegisterRef.current?.textContent === buttons[2]) {
      localRegister(ID.email, ID.password, ID.username)
        .then(() => {
          if (onLoginChange) onLoginChange(isLogged());
          toogleFormType("", setFormType, showModal, setShowModal);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use")
            toast.error("The email address is already in use ❌");
        });
    } else {
      localSignin(ID.email, ID.password)
        .then(() => {
          if (onLoginChange) onLoginChange(isLogged());
          toogleFormType("", setFormType, showModal, setShowModal);
        })
        .catch((error) => {
          if (error.code === "auth/invalid-credential")
            toast.error(`You are not registered`);
        });
    }

    setUser({ username: "", password: "", email: "" });
  };

  const googleAuth = () => {
    if (typeLoginRegisterRef.current?.textContent === buttons[2]) {
      registerWithGoogle().then(() => {
        if (onLoginChange) onLoginChange(isLogged());
        toogleFormType("", setFormType, showModal, setShowModal);
      });
    } else {
      signInWithGoogle().then(() => {
        if (onLoginChange) onLoginChange(isLogged());
        toogleFormType("", setFormType, showModal, setShowModal);
      });
    }
  };

  const loginOrLogout = () => {
    if (isLogged()) {
      signOutUser(logRef).then(() => {
        if (onLoginChange) onLoginChange(isLogged());
      });
    } else toogleFormType("login", setFormType, showModal, setShowModal);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="auth">
        <button id="signIn" onClick={() => loginOrLogout()} ref={logRef}>
          {isLogged() ? buttons[1] : buttons[0]}
        </button>
        <Button
          event={() =>
            toogleFormType("register", setFormType, showModal, setShowModal)
          }
          id="register"
        >
          {buttons[2]}
        </Button>
        {showModal && (
          <>
            <div
              className="modalBackdrop"
              onClick={() =>
                toogleFormType("", setFormType, showModal, setShowModal)
              }
            ></div>
            <div className="modalAuth">
              <div className="modalContent">
                <span
                  className="closeAuth"
                  onClick={() =>
                    toogleFormType("", setFormType, showModal, setShowModal)
                  }
                >
                  &times;
                </span>
                <h2 ref={typeLoginRegisterRef}>
                  {formType === "login" ? buttons[0] : buttons[2]}
                </h2>
                <form onSubmit={authLogin} className="login-form">
                  <label>
                    Email
                    <input
                      type="text"
                      name="email"
                      value={ID.email}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Username
                    <input
                      type="text"
                      name="username"
                      value={ID.username}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Password
                    <input
                      type="password"
                      name="password"
                      value={ID.password}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <Button type="submit">{buttons[3]}</Button>
                </form>
                <div className="googleAuth" onClick={googleAuth}>
                  Continuar con
                  <svg
                    id="svgGoogle"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path
                      fill="#FF3D00"
                      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                    ></path>
                    <path
                      fill="#4CAF50"
                      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                    ></path>
                    <path
                      fill="#1976D2"
                      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}
        <Toaster position="bottom-right" />
      </div>
    </>
  );
};

export default Auth;