import { useContext, useEffect, useRef, useState } from 'react';
import Button from '@/components/reusable/Button';
import { submitNote } from '@/services/render-data';
import toast from 'react-hot-toast';
import { UserContext } from '@/App';
import { type NoteType } from 'types/types';
import '@/styles/main-contact.css';
import { Helmet } from 'react-helmet-async';
import EmailIcon from '@/assets/svg/email.svg';
import Location from '@/assets/svg/location.svg';
import Phone from '@/assets/svg/phone.svg';
import InstagramSVG from '@/assets/svg/instagram.svg';

const ContactForm = () => {
  // Estado de subsriccion del boton
  const [suscribe, setSuscribe] = useState<boolean>(false);
  // COntexto global
  const user = useContext(UserContext);
  //  Estado del formulario
  const [newNote, setNewNote] = useState<NoteType>({
    email_user: user?.email || '',
    username: '',
    subject: '',
    note: '',
  });
  // Escribiren el formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };
  /// Referencia a los inputs
  const inputRefs = useRef<(HTMLInputElement | HTMLTextAreaElement | null)[]>(
    []
  );

  const onSubmitNote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Verificamos que el usuario este loggeado
    if (!user) {
      toast.error('You must log in');
      return;
    }
    // Activamos la subscripcion del boton
    setSuscribe(true);

    // Lo envimaos y resetamos el formulario
    await submitNote(newNote);
    setNewNote({
      email_user: user.email,
      username: '',
      subject: '',
      note: '',
    } as NoteType);

    // Desactivamos la subscripcion del boton
    setSuscribe(false);
  };

  useEffect(() => {
    const focusFunc: EventListener = (e) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      const parent = target.parentNode as HTMLElement;
      parent.classList.add('focus');
    };

    const blurFunc: EventListener = (e) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      const parent = target.parentNode as HTMLElement;
      if (target.value === '') parent.classList.remove('focus');
    };

    const currentInputRefs = inputRefs.current;

    currentInputRefs.forEach((input) => {
      if (input) {
        input.addEventListener('focus', focusFunc);
        input.addEventListener('blur', blurFunc);
      }
    });

    return () => {
      currentInputRefs.forEach((input) => {
        if (input) {
          input.removeEventListener('focus', focusFunc);
          input.removeEventListener('blur', blurFunc);
        }
      });
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact</title>
        <meta
          name="description"
          content="Contact The Fluent Spanish House. Do you want to sign up? Ask me any question you have"
        />
      </Helmet>
      <main className="contact">
        <div className="container">
          <span className="big-circle"></span>
          <img src="img/shape.webp" className="square" alt="" />
          <div className="form">
            <div className="contact-info">
              <h3 className="title">Let's get in touch</h3>
              <p className="text">
                Do you want to sign up? <br />
                Ask me any question you have
              </p>

              <div className="info">
                <div className="information">
                  <Location />
                  <p>Around the world</p>
                </div>
                <div className="information">
                  <EmailIcon />
                  <p>mar411geca@gmail.com</p>
                </div>
                <div className="information">
                  <Phone />
                  <p>+34 617286125</p>
                </div>
              </div>

              <div className="social-media">
                <p>Connect with us :</p>
                <div className="social-icons">
                  <a
                    href="https://www.facebook.com/thefluentspanishhouse/"
                    target="_blank"
                    title="Facebook"
                  >
                    <i
                      className="fab fa-facebook-f"
                      style={{ fontSize: '22px' }}
                    >
                      F
                    </i>
                  </a>

                  <a
                    href="https://www.instagram.com/thefluentspanishhouse/"
                    target="_blank"
                    title="Intagram"
                  >
                    <i className="fab fa-github">
                      <InstagramSVG />
                    </i>
                  </a>
                  <a
                    href="https://github.com/karlosvas/thefluentspanishhouse"
                    target="_blank"
                    title="Github"
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
                    ref={(el) => {
                      if (el) inputRefs.current[0] = el;
                    }}
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
                    ref={(el) => {
                      if (el) inputRefs.current[2] = el;
                    }}
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
                    ref={(el) => {
                      if (el) inputRefs.current[3] = el;
                    }}
                    id="note"
                  ></textarea>
                  <label htmlFor="note">Message</label>
                  <span>Message</span>
                </div>
                <Button type="submit" id="btn" suscribe={suscribe}>
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ContactForm;
