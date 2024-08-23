import { useContext, useState } from "react";
import Auth from "./Auth";
import ImgUser from "@/components/svg-component/ImgUser";
import "@/styles/profileicon.css";
import { UserContext } from "@/App";

const Profile = () => {
  const [imgLoad, setImgLoad] = useState(false);
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
              {img !== null ? (
                <img
                  src={img}
                  alt="Photo profile user"
                  onLoad={() => setImgLoad(true)}
                  onError={() => setImgLoad(false)}
                  style={{ display: imgLoad ? "block" : "none" }}
                />
              ) : (
                <ImgUser />
              )}
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
