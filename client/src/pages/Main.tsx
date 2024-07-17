import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import ContentMain from "../layouts/ContentMain";
import { Translations } from "../../types/types";

const Main: React.FC<Translations> = ({ translation }) => {
  return (
    <>
      <Header translation={translation} />
      <ContentMain translation={translation} />
      <Footer />
    </>
  );
};

export default Main;
