import styles from "./Index.module.css";

const Contact = () => {
  return (
    <div className={styles["contact-container"]}>
      <h1 className={styles["contact-title"]}>Contact Us</h1>
      <form className={styles["contact-form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required></textarea>
        </div>
        <button type="submit" className={styles["submit-button"]}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
