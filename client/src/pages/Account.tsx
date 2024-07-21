import { Toaster } from "react-hot-toast";
import Profile from "../components/Profile";
import { type Translations } from "../../types/types";
import "../styles/account/main-account.css";
import Header from "../layouts/Header";
import { getUser } from "../scripts/oauth2-0";
import { Edit } from "../components/svg/Edit";
import Trash from "../components/svg/Trash";

const Account: React.FC<Translations> = ({ translation }) => {
  const user = getUser();
  const biografy = "";
  const commentText = "hola";
  return (
    <>
      <Header translation={translation}></Header>
      <main id="mainAccount">
        <Profile translation={translation}></Profile>
        <section>
          <h3>Información</h3>
          <ul>
            <li>
              Usuario <input type="text" value={user?.displayName || ""} />
              <Edit commentText={commentText} />
              <Trash />
            </li>
            <li>
              Email <input type="text" value={user?.email || ""} />
              <Edit commentText={commentText} />
              <Trash />
            </li>
            <li>
              Phone <input type="text" value={user?.phoneNumber || ""} />
              <Edit commentText={commentText} />
              <Trash />
            </li>
            <li>
              Biografia <input type="text" value={biografy || ""} />
              <Edit commentText={commentText} />
              <Trash />
            </li>
          </ul>
        </section>
      </main>
      <Toaster />
    </>
  );
};

export default Account;
