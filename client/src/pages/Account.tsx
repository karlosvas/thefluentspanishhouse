import { Toaster } from "react-hot-toast";
import Profile from "../components/Profile";
import { type Translations } from "../../types/types";
import "../styles/account/main-account.css";
import Header from "../layouts/Header";
import { getUser } from "../scripts/oauth2-0";
import CommentCard from "../components/render_data/CommentCard";

const Account: React.FC<Translations> = ({ translation }) => {
  const user = getUser();
  const biografy = "";

  return (
    <>
      <Header translation={translation}></Header>
      <main id="mainAccount">
        <Profile translation={translation}></Profile>
        <section>
          <h3>Informacion</h3>
          <ul>
            <li>
              Usuario <input type="text" value={user?.displayName || ""} />
            </li>
            <li>
              Email <input type="text" value={user?.email || ""} />
            </li>
            <li>
              Phone <input type="text" value={user?.phoneNumber || ""} />
            </li>
            <li>
              Biografia <input type="text" value={biografy || ""} />
            </li>
          </ul>
        </section>
        <section>
          <h3>Comentarios</h3>
          <CommentCard comments={[]} />
        </section>
      </main>
      <Toaster />
    </>
  );
};

export default Account;
