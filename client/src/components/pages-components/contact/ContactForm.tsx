import { ChangeEvent, FormEvent, useState } from "react";
import { sendEmail } from "../../../scripts/render-data";
import { getUser } from "../../../scripts/oauth2-0";

const ContactForm = () => {
  const user = getUser();
  const [contact, setContact] = useState({
    email: user?.email,
    name: "",
    note: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendEmail(contact);
    setContact({
      email: user?.email,
      name: "",
      note: "",
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  return (
    <form id="contactForm" onSubmit={handleSubmit}>
      <h2>Contact me</h2>
      <p>Do you want to sign up? Ask me any question you have</p>
      <label>
        Full Name
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Delivery note
        <textarea
          name="note"
          value={contact.note}
          onChange={handleChange}
          required
        ></textarea>
      </label>
      <button type="submit">Submit</button>{" "}
    </form>
  );
};

export default ContactForm;
