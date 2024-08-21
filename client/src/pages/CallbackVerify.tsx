import {
  Link,
  NavigateFunction,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { changeOptionsEmail } from "../scripts/firebase-users";
import toast from "react-hot-toast";
import ShowPassword from "../components/reusable/ShowPassword";
import { UserContext } from "../App";

export const CallbackVerify = () => {
  const [ID, setID] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [searchParams] = useSearchParams();
  const [verification, setVerification] = useState(false);

  const navigate: NavigateFunction = useNavigate();
  const newEmail = searchParams.get("email");

  const user = useContext(UserContext);

  async function submitDataVerifyEmail(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newEmail) {
      try {
        await changeOptionsEmail(ID.password, navigate, newEmail, user);
        setVerification(true);
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
    if (!newEmail) navigate("/404");
  }, []);

  return (
    <div className="error">
      {verification ? (
        <>
          <section className="err-flex">
            <h1>Verification sent successfully, welcome!!</h1>
            <small>When the email is verified your email will be changed</small>
            <Link to="/">Go Home</Link>
          </section>
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
  );
};

export default CallbackVerify;
