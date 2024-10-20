import { useParams } from "react-router-dom";
import styles from "./Index.module.css";

const About = () => {
  const { lang } = useParams<{ lang: string }>();

  const content = {
    en: {
      title: "About Us",
      text: "Welcome to our website! We are dedicated to providing the best travel experiences to Georgia. Our team is passionate about exploring new destinations and sharing our adventures with you.",
    },
    ka: {
      title: "ჩვენს შესახებ",
      text: "მოგესალმებით ჩვენს ვებგვერდზე! ჩვენ ვცდილობთ მოგაწოდოთ საუკეთესო მოგზაურობის გამოცდილება საქართველოში. ჩვენი გუნდი გატაცებულია ახალი მიმართულებების აღმოჩენით და ჩვენი თავგადასავლების გაზიარებით თქვენთან.",
    },
  };

  const currentContent = lang === "ka" ? content.ka : content.en;

  return (
    <div className={styles["about-container"]}>
      <h1 className={styles["about-title"]}>{currentContent.title}</h1>
      <p className={styles["about-content"]}>{currentContent.text}</p>
    </div>
  );
};

export default About;
