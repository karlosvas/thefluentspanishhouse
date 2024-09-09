import PlaceholderImg from "@/components/reusable/PlaceholderImg";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import "@/styles/main-newsettler.css";
import toast from "react-hot-toast";
import Button from "@/components/reusable/Button";
import { getFirstInterestCategory, getInterests, submitSubscriptionMailchimp } from "@/scripts/render-data";
import { Member } from "types/types";

const Newsletter = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    surnames: "",
    birthday: "",
    preferences: "",
    privacy: false,
    newsletter: false,
    mailchimp: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setForm((prevForm) => ({
        ...prevForm,
        [id]: checked,
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [id]: value,
      }));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);

    for (const value of Object.values(form)) {
      if (value === "" || value === false) {
        toast.error("Please fill all the fields");
        toast.error("This action is not yet implemented, we apologize for the inconvenience");
        return;
      }
    }

    const [year, month, day] = form.birthday.split("-");
    console.log(year);
    const formattedBirthday = `${day}/${month}`;

    const allCategorys = await getFirstInterestCategory();
    const category = await getInterests(allCategorys.categories[0].id);

    const interestsIDs: string[] = Object.values(category.interests).map((interest) => {
      return interest.id;
    });

    const interests = {
      [interestsIDs[0].toString()]: form.preferences.includes("grammar"),
      [interestsIDs[1].toString()]: form.preferences.includes("vocabulary"),
      [interestsIDs[2].toString()]: form.preferences.includes("exercises"),
    };

    const member: Member = {
      email_address: form.email,
      status: "pending",
      email_type: "html",
      merge_fields: {
        FNAME: form.name,
        LNAME: form.surnames,
        BIRTHDAY: formattedBirthday,
      },
      interests: interests,
      tags: [],
      status_if_new: "pending",
    };

    submitSubscriptionMailchimp(member);
  };

  const handleScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();

    const targetId = event.currentTarget.getAttribute("href")?.substring(1);
    const targetElement = targetId ? document.getElementById(targetId) : null;

    if (targetElement) {
      const offset = 150;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Newsletter</title>
        <meta
          name="description"
          content="Newsletter of The Fluent Spanish House. Here you can find all the news and updates of the teacher, Marta Gutiérrez Fonseca."
        />
      </Helmet>
      <main className="main-newsletter">
        <section className="info-section">
          <article className="info-article">
            <PlaceholderImg src="img/cafe.png" alt="Cafe" className="img-nw" />
            <div className="info-content">
              <h3>Free Spanish Learning Resources</h3>
              <p>
                Are you eager to improve your Spanish skills? Download our free resources packed with essential
                vocabulary, grammar tips, and practice exercises. Perfect for beginners and advanced learners alike!
                Click the button below to get your free Spanish lessons and start your journey to fluency today!
              </p>
            </div>
          </article>
          <article className="info-article">
            <div className="info-content">
              <section>
                <h3>Do you want all benefits?</h3>
                <h4>Get now is Free</h4>
                <p>
                  Enhance your Spanish learning with our free guide! This resource includes practical exercises, key
                  phrases, and tips to boost your confidence in speaking Spanish. Ideal for all levels. Download now and
                  take the next step in mastering the language!
                </p>
              </section>
              <a href="#formulario" onClick={handleScroll}>
                <Button>FREE DOWNLOAD</Button>
              </a>
            </div>
          </article>
        </section>
        <section className="freecontent-section">
          <article className="freecontent-article">
            <PlaceholderImg src="img/reunion.webp" className="img-nw" alt="Cafe" />
            <div className="freecontent-content">
              <form id="formulario" onSubmit={onSubmit}>
                <h1>Welcome to the Spanish newsletter!</h1>
                <div className="form-group">
                  <input type="text" id="name" placeholder=" " onChange={handleChange} />
                  <label htmlFor="name" className={subscribed && form.name === "" ? "required" : ""}>
                    Nombre
                  </label>
                </div>
                <div className="form-group">
                  <input type="text" id="surnames" placeholder=" " onChange={handleChange} />
                  <label htmlFor="surnames" className={subscribed && form.surnames === "" ? "required" : ""}>
                    Apellidos
                  </label>
                </div>
                <div className="form-group">
                  <input type="email" id="email" placeholder=" " onChange={handleChange} />
                  <label htmlFor="email" className={subscribed && form.email === "" ? "required" : ""}>
                    Correo Electrónico
                  </label>
                </div>
                <div className="form-group">
                  <input type="date" id="birthday" placeholder=" " onChange={handleChange} />
                  <label htmlFor="birthday" className={subscribed && form.birthday === "" ? "required" : ""}>
                    Fecha de Nacimiento
                  </label>
                </div>
                <div className="form-group">
                  <select id="preferences" value={form.preferences} onChange={handleChange}>
                    <option value="" disabled></option>
                    <option value="grammar">Gramática</option>
                    <option value="vocabulary">Vocabulario</option>
                    <option value="exercises">Ejercicios</option>
                  </select>
                  <label htmlFor="preferences" className={subscribed && form.preferences === "" ? "required" : ""}>
                    Preferencias de Contenido
                  </label>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" id="privacy" checked={form.privacy} onChange={handleChange} />
                  <label htmlFor="privacy" className={subscribed && !form.privacy ? "required" : ""}>
                    I have read and accept the <a href="/info">privacy policy</a> and{" "}
                    <a href="/info">terms and conditions</a>
                  </label>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" id="newsletter" checked={form.newsletter} onChange={handleChange} />
                  <label htmlFor="newsletter" className={subscribed && !form.newsletter ? "required" : ""}>
                    I want to receive the newsletter and commercial information from The Fluent Spanish House
                  </label>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" id="mailchimp" checked={form.mailchimp} onChange={handleChange} />
                  <label htmlFor="newsletter" className={subscribed && !form.newsletter ? "required" : ""}>
                    I accept that my data will be processed by{" "}
                    <a href="https://mailchimp.com/legal/" target="_blank">
                      Mailchimp
                    </a>
                  </label>
                </div>
                <Button type="submit" className="suscriber-btn">
                  SUBSCRIBE
                </Button>
              </form>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};

export default Newsletter;
