import { type Translations } from "../../types/types";
import ContactForm from "../components/ContactForm";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

const Contact: React.FC<Translations> = ({ translation }) => {
  return (
    <>
      <Header translation={translation} />
      <ContactForm translation={translation} />
      <Footer />
    </>
  );
};

export default Contact;
