import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Buuton from "@/components/reusable/Button";
import { getMailchimpUser, isMember, updateTagsMailchimp } from "@/scripts/render-data";
import ButtonClose from "@/components/reusable/ButtonClose";
import Backdrop from "@/components/reusable/Backdrop";
import { type FormSuscriberProps, type SubscriberType } from "types/types";
import { handleInputChange } from "@/utilities/utilities";
import { saveUser } from "@/scripts/firebase-db";
import { UserContext } from "@/App";

const FormSuscribe: React.FC<FormSuscriberProps> = ({ closing, handleSusribeChange, buttonName }) => {
  const [suscribe, setSuscribe] = useState(false);
  const [newSubscriber, setNewSubscriber] = useState<SubscriberType>({
    name: "",
    lastname: "",
    email: "",
  });

  const user = useContext(UserContext);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (buttonName === undefined) return;
    setSuscribe(true);

    // Obtenemos el usuario de Mailchimp
    const mailchimpUser = await getMailchimpUser(newSubscriber.email);

    if (mailchimpUser && isMember(mailchimpUser)) {
      // El usuario se ha encontrado por lo que solo cambiamos su nuevo tag
      await updateTagsMailchimp(mailchimpUser, buttonName, handleSusribeChange);
    } else {
      // El usuario no se ha encontrado por lo que lo creamos en firebase database y le añadimos el tag,
      // para que posterirormente cuando se suscriba podamos recuperarlo
      if (user && user.uid) saveUser(user?.uid, buttonName);
    }

    setSuscribe(false);
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
                onChange={(event) => handleInputChange(event, setNewSubscriber)}
                required
              />
            </li>
            <li>
              Name
              <input
                type="text"
                name="name"
                value={newSubscriber.name}
                onChange={(event) => handleInputChange(event, setNewSubscriber)}
                required
              />
            </li>
            <li>
              Lastname
              <input
                type="text"
                name="lastname"
                value={newSubscriber.lastname}
                onChange={(event) => handleInputChange(event, setNewSubscriber)}
                required
              />
            </li>
            <label>
              <input type="checkbox" name="terminos" required />I give my consent to receive informational emails terms
              and conditions.
            </label>
            <label>
              <input type="checkbox" name="terminos" required /> I accept the{" "}
              <Link to="/info" target="_blank">
                terms and conditions.
              </Link>
            </label>
            <label>
              <input type="checkbox" name="terminos" required /> I have read and accept the{" "}
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
