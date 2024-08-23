import { useContext, useEffect, useRef, useState } from "react";
import Button from "@/components/reusable/Buuton";
import { submitNote } from "@/scripts/render-data";
import { isLogged } from "@/scripts/oauth2-0";
import toast from "react-hot-toast";
import { UserContext } from "@/App";
import { type NoteType } from "types/types";
import "@/styles/main-contact.css";

const ContactForm = () => {
  const user = useContext(UserContext);
  const loggin = isLogged();

  const [newNote, setNewNote] = useState<NoteType>({
    email_user: user?.email,
    username: "",
    subject: "",
    note: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>(
    []
  );

  const onSubmitNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loggin) {
      toast.error("You must log in");
      return;
    } else if (!user) {
      toast.error("An unexpected error occurred, please wait and try again.");
      return;
    }
    try {
      console.log("Contect", user.email);
      await submitNote(newNote);
      setNewNote({
        email_user: user.email,
        username: "",
        subject: "",
        note: "",
      } as NoteType);
    } catch (error) {
      toast.error("An error occurred while sending the data");
    }
  };

  useEffect(() => {
    const focusFunc: EventListener = (e) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      const parent = target.parentNode as HTMLElement;
      parent.classList.add("focus");
    };

    const blurFunc: EventListener = (e) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      const parent = target.parentNode as HTMLElement;
      if (target.value === "") parent.classList.remove("focus");
    };

    const currentInputRefs = inputRefs.current;

    currentInputRefs.forEach((input) => {
      if (input) {
        input.addEventListener("focus", focusFunc);
        input.addEventListener("blur", blurFunc);
      }
    });

    return () => {
      currentInputRefs.forEach((input) => {
        if (input) {
          input.removeEventListener("focus", focusFunc);
          input.removeEventListener("blur", blurFunc);
        }
      });
    };
  }, []);

  return (
    <main className="contact">
      <div className="container">
        <span className="big-circle"></span>
        <img src="img/shape.webp" className="square" alt="" />
        <div className="form">
          <div className="contact-info">
            <h3 className="title">Let's get in touch</h3>
            <p className="text">
              Do you want to sign up? Ask me any question you have
            </p>

            <div className="info">
              <div className="information">
                <img src="img/location.webp" className="icon" alt="" />
                <p>Around the world</p>
              </div>
              <div className="information">
                <img src="img/email.webp" className="icon" alt="" />
                <p>mar411geca@gmail.com</p>
              </div>
              <div className="information">
                <img src="img/phone.webp" className="icon" alt="" />
                <p>+34617286125</p>
              </div>
            </div>

            <div className="social-media">
              <p>Connect with us :</p>
              <div className="social-icons">
                <a
                  href="https://www.facebook.com/thefluentspanishhouse/"
                  target="_blank"
                >
                  <i className="fab fa-facebook-f">F</i>
                </a>
                <a
                  href="https://github.com/karlosvas/thefluentspanishhouse"
                  target="_blank"
                >
                  <i className="fab fa-github">&lt;/&gt;</i>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>

            <form autoComplete="off" onSubmit={onSubmitNote}>
              <h3 className="title">Contact us</h3>
              <div className="input-container">
                <input
                  type="text"
                  name="username"
                  className="input"
                  value={newNote.username}
                  required
                  onChange={handleChange}
                  ref={(el) => el && (inputRefs.current[0] = el)}
                  id="username"
                />
                <label htmlFor="username">Username</label>
                <span>Username</span>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  name="subject"
                  className="input"
                  required
                  value={newNote.subject}
                  onChange={handleChange}
                  ref={(el) => el && (inputRefs.current[2] = el)}
                  id="subject"
                />
                <label htmlFor="subject">Subject</label>
                <span>Subject</span>
              </div>
              <div className="input-container textarea">
                <textarea
                  name="note"
                  className="input"
                  value={newNote.note}
                  onChange={handleChange}
                  required
                  ref={(el) => el && (inputRefs.current[3] = el)}
                  id="note"
                ></textarea>
                <label htmlFor="note">Message</label>
                <span>Message</span>
              </div>
              <Button type="submit" id="btn">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactForm;
