import { useContext, useState } from "react";
import Auth from "@/components/header-components/Auth";
import ImgUser from "@/components/svg-component/ImgUser";
import { UserContext } from "@/App";
import "@/styles/profileicon.css";

const Profile = () => {
  const [imgError, setImgError] = useState(false);
  const infoUser = useContext(UserContext);

  return (
    <>
      <div className="profile">
        {infoUser &&
          (window.innerWidth <= 766 ||
            window.location.pathname === "/account") && (
            <>
              {infoUser.photoURL && !imgError ? (
                <img
                  src={infoUser?.photoURL}
                  alt="Photo profile user"
                  onError={() => setImgError(true)}
                />
              ) : (
                <ImgUser />
              )}
              <div className="username">
                {infoUser?.displayName ? (
                  <strong>{infoUser?.displayName}</strong>
                ) : (
                  <strong>Loading...</strong>
                )}
                <small>{infoUser?.email}</small>
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
