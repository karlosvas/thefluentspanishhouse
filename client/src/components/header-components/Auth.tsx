import { ChangeEvent, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  signInWithGoogle,
  registerWithGoogle,
  signOutUser,
  isLogged,
  localRegister,
  localSignin,
} from "../../scripts/oauth2-0";
import { toggleFormType } from "../../scripts/modal";
import Button from "../reusable/Buuton";
import { type AuthProps } from "../../../types/types";
import "../../styles/modal-auth.css";

const Auth: React.FC<AuthProps> = ({ onLoginChange, logged }) => {
  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("login");
  const [ID, setID] = useState({
    username: "",
    password: "",
    email: "",
  });
  const typeLoginRegisterRef = useRef<HTMLHeadingElement>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isRegister = typeLoginRegisterRef.current?.textContent === "Register";

    try {
      if (isRegister) {
        await localRegister(ID.email, ID.password, ID.username);
      } else {
        await localSignin(ID.email, ID.password);
      }
      onLoginChange?.(isLogged());
      toggleFormType("", setFormType, showModal, setShowModal);
      if (
        ID.email == "carlosvassan@gmail.com" ||
        ID.email == "mar411geca@gmail.com"
      )
        location.reload();
    } catch (error) {
      const firebaseError = error as { code?: string };
      const errorMessage =
        isRegister && firebaseError.code === "auth/email-already-in-use"
          ? "The email address is already in use. Please try logging in. ❌"
          : !isRegister && firebaseError.code === "auth/invalid-credential"
          ? "You are not registered"
          : "An error occurred";
      toast.error(errorMessage);
    }
    setID({ username: "", password: "", email: "" });
  };

  const handleGoogleAuth = async () => {
    const isRegister = typeLoginRegisterRef.current?.textContent === "Register";
    try {
      const user = isRegister
        ? await registerWithGoogle()
        : await signInWithGoogle();

      onLoginChange?.(isLogged());
      toggleFormType("", setFormType, showModal, setShowModal);
      if (
        user?.email == "carlosvassan@gmail.com" ||
        ID.email == "mar411geca@gmail.com"
      )
        location.reload();
    } catch (error) {
      toast.error("An error occurred with Google authentication");
    }
  };

  const handleFacebookAuth = async () => {
    const isRegister = typeLoginRegisterRef.current?.textContent === "Register";
    try {
      const user = isRegister
        ? await registerWithGoogle()
        : await signInWithGoogle();

      onLoginChange?.(isLogged());
      toggleFormType("", setFormType, showModal, setShowModal);
      if (
        user?.email == "carlosvassan@gmail.com" ||
        ID.email == "mar411geca@gmail.com"
      )
        location.reload();
    } catch (error) {
      toast.error("An error occurred with Google authentication");
    }
  };

  const handleLoginOrLogout = async () => {
    if (isLogged()) {
      await signOutUser();
      onLoginChange?.(isLogged());
      location.reload();
    } else {
      toggleFormType("login", setFormType, showModal, setShowModal);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setID((prev) => ({ ...prev, [name]: value }));
  };

  const [showUsernameField, setShowUsernameField] = useState(false);

  useEffect(() => {
    if (typeLoginRegisterRef.current) {
      setShowUsernameField(
        typeLoginRegisterRef.current.textContent === "Register"
      );
    }
  }, [formType]);

  const forgotPasword = () => {
    console.log("hola");
  };

  return (
    <>
      <div className="auth">
        <Button id="signIn" event={handleLoginOrLogout}>
          {logged ? "Logout" : "Sign In"}
        </Button>
        <Button
          event={() =>
            toggleFormType("register", setFormType, showModal, setShowModal)
          }
          id="register"
        >
          Register
        </Button>
        {showModal && (
          <>
            <div
              className="modalBackdropLog"
              onClick={() =>
                toggleFormType("", setFormType, showModal, setShowModal)
              }
            ></div>
            <div className="modalAuth">
              <div className="modalContent">
                <span
                  className="closeAuth"
                  onClick={() =>
                    toggleFormType("", setFormType, showModal, setShowModal)
                  }
                >
                  &times;
                </span>
                <h1 ref={typeLoginRegisterRef}>
                  {formType === "login" ? "Sign In" : "Register"}
                </h1>
                <form onSubmit={handleFormSubmit} className="login-form">
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
                  {showUsernameField && (
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
                  )}
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
                  <small onClick={() => forgotPasword}>
                    Forgot your password?
                  </small>
                  <Button type="submit">Submit</Button>
                </form>
                <div className="googleAuth" onClick={handleGoogleAuth}>
                  Continue with
                  <svg
                    className="providers"
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
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
                <div className="googleAuth" onClick={handleFacebookAuth}>
                  Continue with
                  <svg
                    className="providers"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="30"
                    height="30"
                    viewBox="0 0 100 100"
                  >
                    <polygon
                      fill="#4b4dff"
                      points="79,78 18.126,78 18.126,19 78.622,19"
                    ></polygon>
                    <path
                      fill="#edf7f5"
                      d="M43.835,75.54h9.873V53.657h5.915l0.807-7.377h-6.722l0.009-4.139c0-1.975,0.19-3.019,3.009-3.019 H61v-7.348h-7.348c-7.263,0-9.816,3.655-9.816,9.807v4.699H40v7.377h3.835V75.54z"
                    ></path>
                    <path
                      fill="#4343bf"
                      d="M82,81H15V16h67.052L82,81z M21,75h54.051l0.897-53H21V75z"
                    ></path>
                    <polygon
                      fill="#3abcf8"
                      points="85,85 21,85 21,75 75,75 75,22 85,22"
                    ></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Auth;
