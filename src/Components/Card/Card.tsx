import data from "../../country.json";
import CardContent from "./card-content/CardContent";
import CardFooter from "./card-footer/CardFooter";
import CardHeader from "./card-header/CardHeader";
import styles from "./Card.module.css";

const Card: React.FC = () => {
  return (
    <div className={styles["card-styles"]}>
      <CardHeader>
        <header className={styles["card-header"]}>New</header>
      </CardHeader>

      <CardContent>
        {data.map((item, index) => (
          <div key={index} className={styles["card-content-styles"]}>
            <h2>Country: {item.name}</h2>
            <p>Capital: {item.capital}</p>
            <p>Population: {item.population}</p>
          </div>
        ))}
      </CardContent>

      <CardFooter>
        <footer className={styles["card-footer"]}>
          <div className={styles["card-footer-content"]}>
            <p>View</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className={styles["arrow-svg"]}
            >
              <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
            </svg>
          </div>
        </footer>
      </CardFooter>
    </div>
  );
};

export default Card;
