import { useState } from "react";
import { Link } from "react-router-dom";
import Buuton from "../../reusable/Buuton";
import { handleSubmitSubscription } from "../../../scripts/render-data";
import {
  type FormSuscriberProps,
  type SubscriberType,
} from "../../../../types/types";

const FormSuscribe: React.FC<FormSuscriberProps> = ({
  closing,
  handleChange,
  buttonName,
}) => {
  const [newSubscriber, setNewSubscriber] = useState<SubscriberType>({
    name: "",
    lastname: "",
    email: "",
  });

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
    await handleSubmitSubscription(
      event,
      handleChange,
      newSubscriber,
      buttonName
    );
  };

  return (
    <>
      <div className={`uploadPublication ${closing ? "closing" : ""}`}>
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
              <input type="checkbox" name="terminos" required /> I accept the{" "}
              <Link to="/info" target="_blank">
                terms and conditions
              </Link>
            </label>
            <label>
              <input type="checkbox" name="terminos" required /> I give my
              consent to receive informational emails terms and conditions
            </label>
            <Buuton id="submitPost" type="submit">
              To subscribe
            </Buuton>
          </ul>
        </form>
      </div>
      <div className="modalBackdropLog" onClick={handleChange}></div>
    </>
  );
};

export default FormSuscribe;