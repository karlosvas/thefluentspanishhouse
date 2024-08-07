import { useState } from "react";
import Button from "../../reusable/Buuton";
import "../../../styles/main-contact.css";
import { submitNote } from "../../../scripts/render-data";
import { type NoteType } from "../../../../types/types";
import { getUser } from "../../../scripts/oauth2-0";

const ContactForm = () => {
  const user = getUser();
  const [newNote, setNewNote] = useState<NoteType>({
    email_user: user?.email,
    name_user: "",
    note: "",
  });

  const onSubmitNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitNote(newNote);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  return (
    <form id="contactForm" onSubmit={onSubmitNote}>
      <h2>Contact me</h2>
      <p>Do you want to sign up? Ask me any question you have</p>
      <label>
        Full Name
        <input
          type="text"
          name="name_user"
          value={newNote.name_user}
          onChange={handleChange}
          placeholder=""
          required
        />
      </label>
      <label>
        Delivery note
        <textarea
          name="note"
          value={newNote.note}
          onChange={handleChange}
          placeholder=""
          required
        ></textarea>
      </label>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ContactForm;
