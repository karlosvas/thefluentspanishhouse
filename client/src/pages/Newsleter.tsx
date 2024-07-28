import { Translations } from "../../types/types";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

const Newsetler: React.FC<Translations> = ({ translation }) => {
  return (
    <>
      <Header translation={translation} />
      <main className="main-newsleter"></main>
      <Footer />
    </>
  );
};

export default Newsetler;
