import { useContext, useEffect, useState } from "react";
import Profile from "../components/header-components/Profile";
import Edit from "../components/svg-component/Edit";
import Trash from "../components/svg-component/Trash";
import { ConfigUser } from "../../types/types";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../styles/main-account.css";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { UserContext } from "../App";

const Account = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  if (!user && location.pathname === "/account") {
    navigate("/");
  }

  const [configUser, setConfigUser] = useState<ConfigUser>({
    user: "",
    displayName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [inputsState, setInputsState] = useState([false, false, false]);

  const firebase_user = useContext(UserContext);
  const manejarClickSVG = (index: number) => {
    if (
      firebase_user?.providerData.some(
        (provider) => provider.providerId !== "password"
      )
    ) {
      toast.error(
        `The user authenticated with ${firebase_user?.providerData[0].providerId} cannot change the account settings of some options`
      );
      return;
    }

    setInputsState((prevStates) => {
      const nuevosEstados = [...prevStates];
      nuevosEstados[index] = !prevStates[index];
      return nuevosEstados;
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setConfigUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setConfigUser({
          user: user.uid,
          displayName: user.displayName || "",
          email: user.email || "",
          password: "",
          phone: user.phoneNumber || "",
        });
      }
    });
  }, []);

  return (
    <>
      <main className="mainAccount">
        <div className="ac-backdrop-img"></div>
        <div className="ac-content">
          <Profile />
          <section className="ac-info">
            <h3>Información</h3>
            <ul>
              <li>
                User
                <input
                  type="text"
                  name="displayName"
                  value={configUser.displayName}
                  onChange={handleInputChange}
                  disabled={!inputsState[0]}
                  style={{
                    backgroundColor: inputsState[0]
                      ? "transparent"
                      : "rgba(128, 128, 128, 0.5)",
                  }}
                />
                <Edit
                  commentText={configUser.displayName}
                  event={manejarClickSVG}
                  index={0}
                  state={inputsState[0]}
                />
                <Trash />
              </li>
              <li>
                Email
                <input
                  type="text"
                  name="email"
                  value={configUser.email}
                  onChange={handleInputChange}
                  disabled={!inputsState[1]}
                  style={{
                    backgroundColor: inputsState[1]
                      ? "transparent"
                      : "rgba(128, 128, 128, 0.5)",
                  }}
                />
                <Edit
                  commentText={configUser.email}
                  event={manejarClickSVG}
                  index={1}
                  state={inputsState[1]}
                />
                <Trash />
              </li>
              <li>
                Phone
                <input
                  type="text"
                  name="phone"
                  value={configUser.phone}
                  onChange={handleInputChange}
                  disabled={!inputsState[2]}
                  style={{
                    backgroundColor: inputsState[2]
                      ? "transparent"
                      : "rgba(128, 128, 128, 0.5)",
                  }}
                />
                <Edit
                  commentText={configUser.phone}
                  event={manejarClickSVG}
                  index={2}
                  state={inputsState[2]}
                />
                <Trash />
              </li>
            </ul>
          </section>
          <section className="help-center">
            <h2>Help Center</h2>
            <ul>
              <li>
                If you need to verify your account, <a href="">Click here</a>
              </li>
              <li>
                I have lost my <a href="">password</a>
              </li>
              <li>
                I want to contact the website{" "}
                <a
                  href="https://github.com/karlosvas/thefluentspanishhouse"
                  target="_blank"
                >
                  owner
                </a>
              </li>
              <li>
                I want to contact{" "}
                <a href="/contact" target="_blank">
                  my teacher
                </a>
              </li>

              <li>
                Read our{" "}
                <a href="/info" target="_blank">
                  terms and conditions
                </a>{" "}
                and our{" "}
                <a href="info" target="_blank">
                  privacy policy
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
};

export default Account;
