import { useState } from "react";
import { FormPublicationProps, SubscriberType } from "../../../types/types";
import { url_api } from "../../constants/global";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Buuton from "../reusable/Buuton";

const FormSuscribe: React.FC<FormPublicationProps> = ({
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

  const handleSubmitPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${url_api}/api/mailchamp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newSubscriber.name,
          lastname: newSubscriber.lastname,
          email: newSubscriber.email,
          interests: buttonName,
        }),
      });

      response.ok
        ? toast.success("Submitted successfully")
        : toast.error("Error when sending the data");

      response.ok ? handleChange() : "";
    } catch (error) {
      console.error("Error al enviar el post:", error);
    }
  };

  return (
    <>
      <div className={`uploadPublication ${closing ? "closing" : ""}`}>
        <h3>{buttonName}</h3>
        <form onSubmit={handleSubmitPost}>
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
