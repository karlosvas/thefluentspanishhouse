import "../styles/main/profileicon.css";
import { getUser, isLogged } from "../scripts/oauth2-0";
import { useEffect, useState } from "react";
import Auth from "./Auth";
import { type Translations } from "../../types/types";
import ImgUser from "./svg/ImgUser";

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
            {img ? <img src={img} alt="Logo" /> : <ImgUser />}

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
