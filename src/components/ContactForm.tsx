import React, { useState } from 'react';
import '../styles/contactForm.css';

const ContactForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ fullName, deliveryNote });
  };

  return (
    <form id="hForm" className="contactForm" onSubmit={handleSubmit}>
      <h2>Contact me</h2>
      <p>Ask me any question you have</p>
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
      <button type="submit">Save shipping information</button>
    </form>
  );
};

export default ContactForm;
