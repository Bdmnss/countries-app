import Card from "../../components/Card/Card";
import Hero from "../../components/Hero/Hero";
import styles from "./Index.module.css";

const CardPage = () => {
  return (
    <main className={styles["main"]}>
      <Hero />
      <Card />
    </main>
  );
};

export default CardPage;
