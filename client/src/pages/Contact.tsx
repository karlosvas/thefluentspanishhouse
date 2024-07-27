import ContactForm from "../components/pages-components/contact/ContactForm";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { type Translations } from "../../types/types";

const Contact: React.FC<Translations> = ({ translation }) => {
  return (
    <>
      <Header translation={translation} />
      <main className="contact">
        <ContactForm translation={translation} />
      </main>
      <Footer />
    </>
  );
};

export default Contact;
