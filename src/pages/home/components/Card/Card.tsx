import { useNavigate } from "react-router-dom";
import data from "@/data.json";
import CardContent from "../card-content/CardContent";
import CardFooter from "../card-footer/CardFooter";
import CardHeader from "../card-header/CardHeader";
import styles from "./Card.module.css";

const Card: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/${id}`);
  };

  return (
    <div className={styles["card-container"]}>
      {data.map((item, index) => (
        <div
          key={index}
          className={styles["card-styles"]}
          onClick={() => handleCardClick(item.id.toString())}
        >
          <CardHeader>
            <header className={styles["card-header"]}>New</header>
          </CardHeader>
          <CardContent data={item} />
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
      ))}
    </div>
  );
};

export default Card;
