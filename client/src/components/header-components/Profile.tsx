import { useContext } from "react";
import Auth from "./Auth";
import ImgUser from "../svg-component/ImgUser";
import "../../styles/profileicon.css";
import { UserContext } from "../../App";

const Profile = () => {
  const infoUser = useContext(UserContext);
  const img = infoUser?.photoURL;
  const email = infoUser?.email;
  const name = infoUser?.displayName;

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
        <Auth />
      </div>
    </>
  );
};

export default Profile;
