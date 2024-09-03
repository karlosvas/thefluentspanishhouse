import { useState } from "react";
import { Link } from "react-router-dom";
import Buuton from "@/components/reusable/Button";
import { submitSubscriptionMailchamp } from "@/scripts/render-data";
import ButtonClose from "@/components/reusable/ButtonClose";
import Backdrop from "@/components/reusable/Backdrop";
import { type FormSuscriberProps, type SubscriberType } from "types/types";

const FormSuscribe: React.FC<FormSuscriberProps> = ({
  closing,
  handleSusribeChange,
  buttonName,
}) => {
  const [newSubscriber, setNewSubscriber] = useState<SubscriberType>({
    name: "",
    lastname: "",
    email: "",
  });
  const [suscribe, setSuscribe] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setNewSubscriber((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (buttonName === undefined) return;
    setSuscribe(true);
    await submitSubscriptionMailchamp(
      event,
      handleSusribeChange,
      newSubscriber,
      buttonName
    );
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
                onChange={handleInputChange}
                required
              />
            </li>
            <li>
              Name
              <input
                type="text"
                name="name"
                value={newSubscriber.name}
                onChange={handleInputChange}
                required
              />
            </li>
            <li>
              Lastname
              <input
                type="text"
                name="lastname"
                value={newSubscriber.lastname}
                onChange={handleInputChange}
                required
              />
            </li>
            <label>
              <input type="checkbox" name="terminos" required />I give my
              consent to receive informational emails terms and conditions.
            </label>
            <label>
              <input type="checkbox" name="terminos" required /> I accept the{" "}
              <Link to="/info" target="_blank">
                terms and conditions.
              </Link>
            </label>
            <label>
              <input type="checkbox" name="terminos" required /> I have read and
              accept the{" "}
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
