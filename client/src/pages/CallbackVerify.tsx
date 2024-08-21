import {
  Link,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  changeOptionsEmail,
  delateUserFirebase,
} from "../scripts/firebase-users";
import toast from "react-hot-toast";
import ShowPassword from "../components/reusable/ShowPassword";
import { UserContext } from "../App";
import SingleTheme from "../components/header-components/SingleTheme";

export const CallbackVerify = () => {
  const [response, setResponse] = useState("");

  const [ID, setID] = useState({
    username: "",
    password: "",
    email: "",
  });

  const navigate: NavigateFunction = useNavigate();

  const location = useLocation();
  const { email, del } = location.state || {};
  const newEmail = email;

  const user = useContext(UserContext);

  async function submitDataVerifyEmail(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newEmail) {
      try {
        await changeOptionsEmail(ID.password, navigate, newEmail, user);
      } catch (error) {
        toast.error(
          "An unexpected error occurred, make sure you wrote the password correctly"
        );
      }
    } else {
      navigate("/404");
    }
  }

  useEffect(() => {
    if (!email) navigate("/404");
  }, []);

  async function submitDelateUser() {
    if (response !== "DELETE ACCOUNT")
      return toast.error("You must type DELETE ACCOUNT to proceed");

    try {
      await delateUserFirebase(user, ID.password);
    } catch (error) {
      console.error(error);
      toast.error(
        "An unexpected error occurred, make sure you wrote the password correctly"
      );
    }
    setResponse("");
    setID({ ...ID, password: "" });
    setTimeout(() => {
      navigate("/");
    }, 10000);
  }

  return (
    <>
      <SingleTheme />
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
        ) : (
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
        )}
      </div>
    </>
  );
};

export default CallbackVerify;
