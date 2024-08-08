import { useState } from "react";
import Button from "../../reusable/Buuton";
import "../../../styles/main-contact.css";
import { submitNote } from "../../../scripts/render-data";
import { type NoteType } from "../../../../types/types";
import { getUser, isLogged } from "../../../scripts/oauth2-0";
import toast from "react-hot-toast";

const ContactForm = () => {
  const user = getUser();
  const loggin = isLogged();

  const [newNote, setNewNote] = useState<NoteType>({
    email_user: user?.email,
    name_user: "",
    note: "",
  });

  const onSubmitNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loggin) {
      toast.error("You must log in");
      return;
    }
    try {
      await submitNote(newNote);
      setNewNote({
        email_user: user?.email,
        name_user: "",
        note: "",
      } as NoteType);
    } catch (error) {
      toast.error("An error occurred while sending the data");
    }
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
