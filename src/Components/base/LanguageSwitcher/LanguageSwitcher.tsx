import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./LanguageSwitcher.module.css";

const LanguageSwitcher: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const switchLanguage = (newLang: string) => {
    navigate(`/${newLang}/cities`);
  };

  return (
    <div className={styles["language-switcher"]}>
      <button
        className={styles["language-button"]}
        onClick={() => switchLanguage("ka")}
        disabled={lang === "ka"}
      >
        Georgian
      </button>
      <button
        className={styles["language-button"]}
        onClick={() => switchLanguage("en")}
        disabled={lang === "en"}
      >
        English
      </button>
    </div>
  );
};

export default LanguageSwitcher;
