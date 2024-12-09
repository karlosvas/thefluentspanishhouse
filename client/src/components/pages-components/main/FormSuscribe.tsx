import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Buuton from "@/components/reusable/Button";
import { getMailchimpUser, sendEmailNewClass, updateTagsMailchimp } from "@/scripts/render-data";
import ButtonClose from "@/components/reusable/ButtonClose";
import Backdrop from "@/components/reusable/Backdrop";
import { getTag, handleInputChange } from "@/utilities/utilities";
import { saveUserAndAddTag } from "@/scripts/firebase-db";
import { UserContext } from "@/App";
import toast from "react-hot-toast";
import { isMember } from "@/utilities/utilities-types";
import { isValidEmail } from "@/utilities/validateEmail";
import { type FormSuscriberProps, type SubscriberType } from "types/types";

const FormSuscribe: React.FC<FormSuscriberProps> = ({ closing, handleSusribeChange, buttonName }) => {
  // Estado para saber si se ha enviado el formulario o si se esta procesando
  const [suscribe, setSuscribe] = useState(false);
  // Inputs del formulario
  const [newSubscriber, setNewSubscriber] = useState<SubscriberType>({
    name: "",
    lastname: "",
    email: "",
    class: "",
    consentEmails: false,
    acceptTerms: false,
    acceptPrivacy: false,
  });
  // Usuario actual
  const user = useContext(UserContext);

  // Envio de formulario
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Añadimos la clase seleionada al usuario
    if (buttonName === undefined) return;
    newSubscriber.class = getTag(buttonName);

    if (!isValidEmail(newSubscriber.email)) {
      toast.error("Email is not valid");
      return;
    }

    // Comienzo del proceso de suscripción
    setSuscribe(true);
    toast.loading("Aiming for classes...");

    // // Obtenemos el usuario de Mailchimp
    const mailchimpUser = await getMailchimpUser(newSubscriber.email);

    if (mailchimpUser && isMember(mailchimpUser)) {
      // El usuario se ha encontrado por lo que solo cambiamos su nuevo tag, succes o error se maneja en la función
      await updateTagsMailchimp(mailchimpUser, newSubscriber.class, handleSusribeChange);
      // Falta funcionalidad ???? añadir tag en firebase a usuarios de mailchimp
      // await saveUserAndAddTag(user.uid, buttonName, newSubscriber);
    } else {
      // El usuario no se ha encontrado

      if (!user) {
        toast.dismiss();
        toast.error("Do you need Sing In to subscribe to the course");
        setSuscribe(false);
        return;
      }

      if (user.email !== newSubscriber.email) {
        toast.dismiss();
        toast.error(`The email does not match the user logged in, please log in with ${user.email}`);
        setSuscribe(false);
        return;
      }

      try {
        // Creamos o actualizados en FirebaseDB para añadirle el tag, y que posterirormente
        // cuando se suscriba poder recuperarlo.
        await saveUserAndAddTag(user.uid, newSubscriber.class, newSubscriber);
        // Enviamos el email al administrador para que sepa que hay un nuevo suscriptor
        await sendEmailNewClass(newSubscriber);
      } catch (error) {
        toast.dismiss();
        toast.error("Unexpected error, please try again");
      }
    }

    // Cerramos el formulario
    setSuscribe(false);
    handleSusribeChange();
  };

  return (
    <>
      <div className={`upload-publication`}>
        <ButtonClose handleSusribeChange={handleSusribeChange} />
        <h3>{buttonName}</h3>
        <form onSubmit={onSubmit}>
          <ul>
            <li>
              Email
              <input
                type="text"
                name="email"
                value={newSubscriber.email}
                onChange={(e) => handleInputChange(e, setNewSubscriber)}
                required
              />
            </li>
            <li>
              Name
              <input
                type="text"
                name="name"
                value={newSubscriber.name}
                onChange={(e) => handleInputChange(e, setNewSubscriber)}
                required
              />
            </li>
            <li>
              Lastname
              <input
                type="text"
                name="lastname"
                value={newSubscriber.lastname}
                onChange={(e) => handleInputChange(e, setNewSubscriber)}
                required
              />
            </li>
            <label>
              <input
                type="checkbox"
                name="consentEmails"
                checked={newSubscriber.consentEmails}
                onChange={(e) => handleInputChange(e, setNewSubscriber)}
                required
              />
              I give my consent to receive informational emails terms and conditions.
            </label>
            <label>
              <input
                type="checkbox"
                name="acceptTerms"
                checked={newSubscriber.acceptTerms}
                onChange={(event) => handleInputChange(event, setNewSubscriber)}
                required
              />{" "}
              I accept the{" "}
              <Link to="/info" target="_blank">
                terms and conditions.
              </Link>
            </label>
            <label>
              <input
                type="checkbox"
                name="acceptPrivacy"
                checked={newSubscriber.acceptPrivacy}
                onChange={(event) => handleInputChange(event, setNewSubscriber)}
                required
              />{" "}
              I have read and accept the{" "}
              <Link to="/info" target="_blank">
                privacity policity.
              </Link>
            </label>
            <Buuton id="submit-post" type="submit" suscribe={suscribe}>
              To subscribe
            </Buuton>
          </ul>
        </form>
      </div>
      <Backdrop handleSusribeChange={handleSusribeChange} closing={closing} />
    </>
  );
};

export default FormSuscribe;
