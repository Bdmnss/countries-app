import styles from "./Index.module.css";

const Contact = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      surname: formData.get("surname"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    console.log(data);
  };

  return (
    <div className={styles["contact-container"]}>
      <h1 className={styles["contact-title"]}>Contact Us</h1>
      <form className={styles["contact-form"]} onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="surname">Surname:</label>
          <input type="text" id="surname" name="surname" required />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message"></textarea>
        </div>
        <button type="submit" className={styles["submit-button"]}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
