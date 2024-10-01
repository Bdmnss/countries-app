import styles from "./Index.module.css";

const About = () => {
  return (
    <div className={styles["about-container"]}>
      <h1 className={styles["about-title"]}>About Us</h1>
      <p className={styles["about-content"]}>
        Welcome to our website! We are dedicated to providing the best travel
        experiences to Georgia. Our team is passionate about exploring new
        destinations and sharing our adventures with you.
      </p>
    </div>
  );
};

export default About;
