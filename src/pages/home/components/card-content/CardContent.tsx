import styles from "./CardContent.module.css";

interface CountryData {
  id: number;
  name: string;
  duration: string;
  price: number;
}

interface CardContentProps {
  data: CountryData;
}

const CardContent: React.FC<CardContentProps> = ({ data }) => {
  return (
    <div className={styles["card-content-styles"]}>
      <h2>Country: {data.name}</h2>
      <p>Tour Length: {data.duration}</p>
      <p>Price: {data.price}$</p>
    </div>
  );
};

export default CardContent;
