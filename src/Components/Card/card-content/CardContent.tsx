import styles from "./CardContent.module.css";

interface CountryData {
  name: string;
  capital: string;
  population: string;
}

interface CardContentProps {
  data: CountryData[];
}

const CardContent: React.FC<CardContentProps> = ({ data }) => {
  return (
    <div className={styles["card-styles"]}>
      {data.map((item, index) => (
        <div key={index} className={styles["card-content-styles"]}>
          <h2>Country: {item.name}</h2>
          <p>Capital: {item.capital}</p>
          <p>Population: {item.population}</p>
        </div>
      ))}
    </div>
  );
};

export default CardContent;
