import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import "./contactUs.css"

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_1ouu2gk', 'template_ugaieci', form.current, {
        publicKey: 'Otm-AKOWFS2SfhEZO',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <div className="form-container">
        <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="from_name" />
      <label>Email</label>
      <input type="email" name="from_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
    <div className="image-container">
        <img src="https://img.freepik.com/free-vector/customer-support-flat-illustration_23-2148889375.jpg?size=626&ext=jpg&ga=GA1.1.452489824.1694654790&semt=ais" alt="Your Image" />
      </div>
    </div>
  );
};