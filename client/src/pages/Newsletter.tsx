import PlaceholderImg from "@/components/reusable/PlaceholderImg";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import Button from "@/components/reusable/Button";
import { fetchGetUidByEmail, getInterests, submitSubscriptionMailchimp } from "@/scripts/render-data";
import { handleInputChange } from "@/utilities/utilities";
import MultiSelectTag from "@/components/reusable/MultiSelectTag";
import { isValidEmail } from "@/utilities/validateEmail";
import { OptionsChampTag, type Member, type NesletterType } from "types/types";
import { getUserDB } from "@/scripts/firebase-db";
import "@/styles/main-newsettler.css";

const Newsletter = () => {
  // Estado del formulario de suscripción
  const [subscribed, setSubscribed] = useState(false);
  // Estado del formulario de suscripción
  const [form, setForm] = useState<NesletterType>({
    email: "",
    name: "",
    surnames: "",
    birthday: "",
    preferences: [],
    privacy: false,
    newsletter: false,
    mailchimp: false,
  });

  const [active, setActive] = useState(false);

  // Función para enviar el formulario de suscripción
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificando que todos los campos estén llenos
    for (const [key, value] of Object.entries(form)) {
      if (key === "birthday" || key === "preferences") continue;

      if (value === "" || value === false) {
        toast.error("Please fill all the fields");
        return;
      }

      if (key === "email" && !isValidEmail(form.email)) {
        toast.error("Email is not valid");
        return;
      }
    }

    // Animacion de boton de suscripción, procesando suscripcion
    setSubscribed(true);
    toast.loading("Processing your subscription...");

    // Si el campo de cumpleaños no está vacío, formateamos la fecha
    let formattedBirthday = "";
    if (form.birthday) {
      // Formateando la fecha de nacimiento
      const [, month, day] = form.birthday.split("-");
      formattedBirthday = `${month}/${day}`;
    }

    // Si el campo de preferencias no está vacío, creamos un objeto con los intereses
    const interests: Record<string, boolean> = {};
    if (form.preferences) {
      // Obtenemos los intereses del grupo, actualmente solo se utiliza una categoría
      const group = await getInterests();
      let actualPreference = 0;
      for (let i = 0; i < group.interests.length; i++) {
        const { name, id } = group.interests[i];
        if (name === form.preferences[actualPreference]) {
          interests[id] = true;
          actualPreference++;
        } else interests[id] = false;
      }
    }

    // Tags de mailchimp
    let tags: OptionsChampTag[] = [];

    // Obtenemos el UID de Firebase
    const uuidFB = await fetchGetUidByEmail(form.email);
    if (uuidFB && uuidFB?.uid) {
      // Actualizamos las tags del usuario por si ya tiene una clase asignada por apuntarse a cursos con anterioridad
      const userFB = await getUserDB(uuidFB.uid);
      if (userFB !== null && userFB.class) tags = userFB.class;
    }

    // Creamos el objeto de miembro
    const member: Member = {
      email_address: form.email,
      status: "pending",
      email_type: "html",
      merge_fields: {
        FNAME: form.name,
        LNAME: form.surnames,
      },
      interests,
      tags,
      status_if_new: "pending",
    };

    // Vericamos si es un valor nulish ("", null, undefined, 0, false, NAN)
    const isFormattedBirthdayValid: boolean = !!formattedBirthday;
    if (isFormattedBirthdayValid) member.merge_fields.BIRTHDAY = formattedBirthday;

    // Detener el loading toast
    toast.dismiss();

    // Enviando la suscripción a la API de Mailchimp
    await submitSubscriptionMailchimp(member);
  };

  // Función para manejar el scroll del boton de download de la página
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();

    // Obtenemos el ID del elemento al que se quiere hacer scroll
    const targetId = e.currentTarget.getAttribute("href")?.substring(1);
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

  const isMultiSelectTagInitialized = useRef(false);
  useEffect(() => {
    if (location.pathname === "/newsletter" && !isMultiSelectTagInitialized.current) {
      MultiSelectTag("preferences", {
        rounded: true,
        shadow: false,
        placeholder: "Search",
        tagColor: {
          textColor: "var(--primary-black)",
          borderColor: "var(--primary-black)",
          bgColor: "rgb(173, 216, 230)",
        },
        onChange: function (values) {
          const preferencesValues = values.map((preference: Record<string, string>) => preference.value);
          setForm((prev) => ({ ...prev, preferences: preferencesValues }));
        },
      });
      isMultiSelectTagInitialized.current = true; // Marcar como inicializado
    } else if (location.pathname !== "/newsletter") {
      isMultiSelectTagInitialized.current = false; // Resetear la inicialización cuando se navega fuera de /newsletter
    }
  }, [location.pathname]);

  // Verificando si hay preferencias seleccionadas
  useEffect(
    () => (form.preferences && form.preferences.length > 0 ? setActive(true) : setActive(false)),
    [form.preferences]
  );

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
            <PlaceholderImg src="img/cafe" alt="Cafe" className="img-nw" />
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
            <PlaceholderImg src="img/reunion" className="img-nw" alt="Cafe" />

            <div className="freecontent-content">
              <form id="formulario" onSubmit={onSubmit}>
                <h1>Welcome to the Spanish newsletter!</h1>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder=" "
                    onChange={(e) => handleInputChange(e, setForm)}
                  />
                  <label htmlFor="name" className={subscribed && form.name === "" ? "required" : ""}>
                    Name
                  </label>
                </div>
                <div className="form-group">
                  <input type="text" name="surnames" placeholder=" " onChange={(e) => handleInputChange(e, setForm)} />
                  <label htmlFor="surnames" className={subscribed && form.surnames === "" ? "required" : ""}>
                    Lastname
                  </label>
                </div>
                <div className="form-group">
                  <input type="email" name="email" placeholder=" " onChange={(e) => handleInputChange(e, setForm)} />
                  <label htmlFor="email" className={subscribed && form.email === "" ? "required" : ""}>
                    Email
                  </label>
                </div>
                <div className="form-group">
                  <input
                    type="date"
                    name="birthday"
                    placeholder=" "
                    onChange={(e) => {
                      handleInputChange(e, setForm);
                      if (e.target.value) {
                        e.target.classList.add("has-value");
                      } else {
                        e.target.classList.remove("has-value");
                      }
                    }}
                  />
                  <label htmlFor="birthday">Birthday</label>
                </div>
                <div className={`form-group-select ${active ? "active" : ""}`}>
                  <label htmlFor="preferences">Preferences</label>
                  <select id="preferences" multiple>
                    <option value="grammar">Grammar</option>
                    <option value="vocabulary">Vocabulary</option>
                    <option value="exercises">Exercises</option>
                    <option value="pronunciation">Pronunciation</option>
                    <option value="listening">Listening</option>
                    <option value="speaking">Speaking</option>
                    <option value="writing">Writing</option>
                    <option value="conversation">Conversation practice</option>
                  </select>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={form.privacy}
                    onChange={(e) => handleInputChange(e, setForm)}
                  />
                  <label htmlFor="privacy" className={subscribed && !form.privacy ? "required" : ""}>
                    I have read and accept the <a href="/info">privacy policy</a> and{" "}
                    <a href="/info">terms and conditions</a>
                  </label>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={form.newsletter}
                    onChange={(e) => handleInputChange(e, setForm)}
                  />
                  <label htmlFor="newsletter" className={subscribed && !form.newsletter ? "required" : ""}>
                    I want to receive the newsletter and commercial information from The Fluent Spanish House
                  </label>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    name="mailchimp"
                    checked={form.mailchimp}
                    onChange={(e) => handleInputChange(e, setForm)}
                  />
                  <label htmlFor="mailchimp" className={subscribed && !form.mailchimp ? "required" : ""}>
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
