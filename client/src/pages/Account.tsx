import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Toaster } from "react-hot-toast";
import Profile from "../components/Profile";
import Header from "../layouts/Header";
import Edit from "../components/svg/Edit";
import Trash from "../components/svg/Trash";
import { type Translations } from "../../types/types";
import { type User } from "firebase/auth";
import "../styles/account/main-account.css";

const Account: React.FC<Translations> = ({ translation }) => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
        setEmail(currentUser.email || "");
        setPhoneNumber(currentUser.phoneNumber || "");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDisplayNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisplayName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPhoneNumber(event.target.value);
  };

  const commentText = "hola";

  return (
    <>
      <Header translation={translation} />
      <main className="mainAccount">
        <Profile translation={translation} />
        <section>
          <h3>Información</h3>
          {user ? (
            <ul>
              <li>
                Usuario
                <input
                  type="text"
                  value={displayName}
                  onChange={handleDisplayNameChange}
                />
                <Edit commentText={commentText} />
                <Trash />
              </li>
              <li>
                Email
                <input type="text" value={email} onChange={handleEmailChange} />
                <Edit commentText={commentText} />
                <Trash />
              </li>
              <li>
                Phone
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
                <Edit commentText={commentText} />
                <Trash />
              </li>
            </ul>
          ) : (
            <p>No estás autenticado</p>
          )}
        </section>
      </main>
      <Toaster />
    </>
  );
};

export default Account;
