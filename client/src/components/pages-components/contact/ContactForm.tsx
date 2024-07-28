import { useState } from "react";
import Button from "../../reusable/Buuton";
import "../../../styles/main-contact.css";

const ContactForm = () => {
  const [fullName, setFullName] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ fullName, deliveryNote });
  };

  return (
    <form id="contactForm" onSubmit={handleSubmit}>
      <h2>Contact me</h2>
      <p>Do you want to sign up? Ask me any question you have</p>
      <label>
        Full Name
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder=""
          required
        />
      </label>
      <label>
        Delivery note
        <textarea
          value={deliveryNote}
          onChange={(e) => setDeliveryNote(e.target.value)}
          placeholder=""
          required
        ></textarea>
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ContactForm;
