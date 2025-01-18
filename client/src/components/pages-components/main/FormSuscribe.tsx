import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Buuton from '@/components/reusable/Button';
import {
  getMailchimpUser,
  sendEmailNewClass,
  updateTagsMailchimp,
} from '@/scripts/render-data';
import ButtonClose from '@/components/reusable/ButtonClose';
import Backdrop from '@/components/reusable/Backdrop';
import { getTag, handleInputChange } from '@/utilities/utilities';
import { saveUser } from '@/scripts/firebase-db';
import { UserContext } from '@/App';
import toast from 'react-hot-toast';
import { isMember } from '@/utilities/utilities-types';
import { isValidEmail } from '@/utilities/validateEmail';
import { type FormSuscriberProps, type SubscriberType } from 'types/types';

const FormSuscribe: React.FC<FormSuscriberProps> = ({
  closing,
  handleSusribeChange,
  buttonName,
}) => {
  // Estado para saber si se ha enviado el formulario o si se esta procesando
  const [suscribe, setSuscribe] = useState(false);
  // Inputs del formulario
  const [newSubscriber, setNewSubscriber] = useState<SubscriberType>({
    name: '',
    lastname: '',
    email: '',
    class: '',
    consentEmails: false,
    acceptTerms: false,
    acceptPrivacy: false,
  });
  // Usuario actual
  const user = useContext(UserContext);

  // Envio de formulario
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Añadimos la clase seleionada al usuario
    if (buttonName === undefined) return;
    newSubscriber.class = getTag(buttonName);

    if (!isValidEmail(newSubscriber.email)) {
      toast.error('Email is not valid');
      console.error('Email is not valid');
      return;
    }

    // Comienzo del proceso de suscripción
    setSuscribe(true);
    toast.loading('Aiming for classes...');

    // // Obtenemos el usuario de Mailchimp
    const mailchimpUser = await getMailchimpUser(newSubscriber.email);

    // Guardamos el usuario en Firebase
    if (user) {
      await saveUser(user.uid, newSubscriber);
    } else {
      toast.dismiss();
      toast.error('Do you need Sing In to subscribe to the course');
      setSuscribe(false);
      return;
    }

    // El usuario se ha encontrado en mailchimp por lo que actualizamos sus tags
    if (mailchimpUser && isMember(mailchimpUser)) {
      await updateTagsMailchimp(
        mailchimpUser,
        newSubscriber.class,
        handleSusribeChange
      );
    }

    // Enviamos el email al administrador para que sepa que hay un nuevo usuaruio inscrito a las clases
    await sendEmailNewClass(newSubscriber);

    // Cerramos el formulario
    setSuscribe(false);
    handleSusribeChange();
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
                onChange={(e) => handleInputChange(e, setNewSubscriber)}
                required
              />
            </li>
            <li>
              Name
              <input
                type="text"
                name="name"
                value={newSubscriber.name}
                onChange={(e) => handleInputChange(e, setNewSubscriber)}
                required
              />
            </li>
            <li>
              Lastname
              <input
                type="text"
                name="lastname"
                value={newSubscriber.lastname}
                onChange={(e) => handleInputChange(e, setNewSubscriber)}
                required
              />
            </li>
            <label>
              <input
                type="checkbox"
                name="consentEmails"
                checked={newSubscriber.consentEmails}
                onChange={(e) => handleInputChange(e, setNewSubscriber)}
                required
              />
              I give my consent to receive informational emails terms and
              conditions.
            </label>
            <label>
              <input
                type="checkbox"
                name="acceptTerms"
                checked={newSubscriber.acceptTerms}
                onChange={(event) => handleInputChange(event, setNewSubscriber)}
                required
              />{' '}
              I accept the{' '}
              <Link to="/info" target="_blank">
                terms and conditions.
              </Link>
            </label>
            <label>
              <input
                type="checkbox"
                name="acceptPrivacy"
                checked={newSubscriber.acceptPrivacy}
                onChange={(event) => handleInputChange(event, setNewSubscriber)}
                required
              />{' '}
              I have read and accept the{' '}
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
