import React, { useState } from 'react';
import styles from './Index.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      name:
        formData.name.length < 3
          ? 'Name must be at least 3 characters long'
          : '',
      surname:
        formData.surname.length < 3
          ? 'Surname must be at least 3 characters long'
          : '',
      email:
        formData.email.length < 5
          ? 'Email must be at least 5 characters long'
          : '',
      message:
        formData.message.length < 10
          ? 'Message must be at least 10 characters long'
          : '',
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (hasErrors) {
      return;
    }

    console.log(formData);
  };

  return (
    <div className={styles['contact-container']}>
      <h1 className={styles['contact-title']}>Contact Us</h1>
      <form className={styles['contact-form']} onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && (
            <p className={styles['error-message']}>{errors.name}</p>
          )}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleInputChange}
          />
          {errors.surname && (
            <p className={styles['error-message']}>{errors.surname}</p>
          )}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && (
            <p className={styles['error-message']}>{errors.email}</p>
          )}
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          {errors.message && (
            <p className={styles['error-message']}>{errors.message}</p>
          )}
        </div>
        <button type="submit" className={styles['submit-button']}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
