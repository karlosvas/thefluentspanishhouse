import { useState } from "react";
import { type Translations } from "../../types/types";
import Button from "./Buuton";
import "../styles/contactForm.css";

const ContactForm: React.FC<Translations> = ({ translation }) => {
  const [fullName, setFullName] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ fullName, deliveryNote });
  };

  const contact: string[] = translation("contact", { returnObjects: true });

  return (
    <form id="contactForm" onSubmit={handleSubmit}>
      <h2>{contact[0]}</h2>
      <p>{contact[1]}</p>
      <label>
        {contact[2]}
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder=""
          required
        />
      </label>
      <label>
        {contact[3]}
        <textarea
          value={deliveryNote}
          onChange={(e) => setDeliveryNote(e.target.value)}
          placeholder=""
          required
        ></textarea>
      </label>
      <Button type="submit">{contact[4]}</Button>
    </form>
  );
};

export default ContactForm;
