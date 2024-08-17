import { getUser, isLogged } from "../../scripts/oauth2-0";
import { useState } from "react";
import Auth from "./Auth";
import ImgUser from "../svg-component/ImgUser";
import "../../styles/profileicon.css";

const Profile = () => {
  const infoUser = getUser();
  const img = infoUser?.photoURL;
  const email = infoUser?.email;
  const name = infoUser?.displayName;

  const [logged, setLogged] = useState<boolean>(isLogged());
  const handleLoginChange = (status: boolean) => {
    setLogged(status);
  };

  return (
    <>
      <div className="profile">
        {infoUser &&
          (window.innerWidth <= 766 ||
            window.location.pathname === "/account") && (
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
        <Auth onLoginChange={handleLoginChange} logged={logged} />
      </div>
    </>
  );
};

export default Profile;
