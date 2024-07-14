import "../styles/main/profileicon.css";
import { getUser, isLogged } from "../scripts/oauth2-0";
import { useEffect, useState } from "react";
import Auth from "./Auth";
import { type Translations } from "../../types/types";

const Profile: React.FC<Translations> = ({ translation }) => {
  const [logged, setLogged] = useState<boolean>(false);
  const infoUser = getUser();

  const img = infoUser?.photoURL;
  const email = infoUser?.email;
  const name = infoUser?.displayName;

  useEffect(() => {
    setLogged(isLogged());
  }, []);

  const handleLoginChange = (status: boolean) => {
    setLogged(status);
  };

  return (
    <>
      <div className="profile">
        {logged && (
          <>
            {img ? (
              <img src={img} alt="Logo" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="profileIcon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}

            <div className="username">
              <strong>{name}</strong>
              <small>{email}</small>
            </div>
          </>
        )}
      </div>
      <div className="auth">
        <Auth translation={translation} onLoginChange={handleLoginChange} />
      </div>
    </>
  );
};

export default Profile;
