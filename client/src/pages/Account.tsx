import { useContext, useState } from "react";
import Profile from "@/components/header-components/Profile";
import Edit from "@/components/svg-component/Edit";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { UserContext } from "@/App";
import Button from "@/components/reusable/Button";
import { getProvider } from "@/scripts/firebase-config";
import { type ConfigUser } from "types/types";
import "@/styles/main-account.css";
import { Helmet } from "react-helmet-async";

const Account = () => {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const [configUser, setConfigUser] = useState<ConfigUser>({
    user: user?.uid || "",
    displayName: user?.displayName || "",
    email: user?.email || "",
    password: "",
    phone: user?.phoneNumber || "",
  });

  if (!user && location.pathname === "/account") navigate("/");

  const [inputsState, setInputsState] = useState([false, false, false]);

  const manejarClickSVG = (index: number) => {
    if (
      user &&
      user?.providerData.some((provider) => provider.providerId !== "password")
    ) {
      toast.error(
        `The user authenticated with ${getProvider(
          user
        )} cannot change the account settings of some options`
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

  const handleDelateUser = () => {
    const email = user?.email;
    const del = true;
    navigate("/verify", { state: { email, del } });
  };

  return (
    <>
      <Helmet>
        <title>Account</title>
        <meta
          name="description"
          content="Change your account settings on The Fluent Spanish House, verify your account, and get help from the website owner or your teacher."
        />
      </Helmet>
      <main className="main-account">
        <div className="ac-backdrop-img"></div>
        <div className="ac-content">
          <Profile />
          <section className="ac-info">
            <h3>Information</h3>
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
              </li>
              {/* <li>
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
            </li> */}
            </ul>
            {user?.email && (
              <Button id="delate-user" event={handleDelateUser}>
                Delate User
              </Button>
            )}
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
