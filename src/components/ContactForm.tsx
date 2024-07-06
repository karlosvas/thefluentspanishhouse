import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/contactForm.css';

const ContactForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ fullName, deliveryNote });
  };

  const [t] = useTranslation("global");
  const contact: string[] = t('contact', { returnObjects: true });


  return (
    <form id="hForm" className="contactForm" onSubmit={handleSubmit}>
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
      <button type="submit">{contact[4]}</button>
    </form>
  );
};

export default ContactForm;
