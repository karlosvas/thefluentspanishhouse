import { useContext } from "react";
import Auth from "@/components/header-components/Auth";
import ImgUser from "@/components/svg-component/ImgUser";
import { UserContext } from "@/App";
import "@/styles/profileicon.css";

const Profile = () => {
  const user = useContext(UserContext);

  return (
    <>
      <div className="profile">
        {user &&
          (window.innerWidth <= 766 ||
            window.location.pathname === "/account") && (
            <>
              <ImgUser photoURL={user?.photoURL} />
              <div className="username">
                {user?.displayName ? (
                  <strong>{user?.displayName}</strong>
                ) : (
                  <strong>Loading...</strong>
                )}
                <small>{user?.email}</small>
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
