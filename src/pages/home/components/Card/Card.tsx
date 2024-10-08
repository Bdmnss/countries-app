import { useNavigate } from "react-router-dom";
import json from "@/data.json";
import CardContent from "../card-content/CardContent";
import CardFooter from "../card-footer/CardFooter";
import CardHeader from "../card-header/CardHeader";
import styles from "./Card.module.css";
import { useState } from "react";

interface IData {
  id: number;
  name: string;
  duration: string;
  price: number;
  about: string;
  likes: number;
}

type TData = IData[];

const Card: React.FC = () => {
  const [data, setData] = useState<TData>(json);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate();

  const handleCardClick = (id: string) => {
    navigate(`/cities/${id}`);
  };

  const handleLike = (id: number) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        item.likes += 1;
      }
      return item;
    });
    setData(newData);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value as "asc" | "desc";
    const sortedData = [...data].sort((a, b) => {
      if (order === "asc") {
        return a.likes - b.likes;
      } else {
        return b.likes - a.likes;
      }
    });
    setData(sortedData);
    setSortOrder(order);
  };

  return (
    <div className={styles["card-container"]}>
      <select
        value={sortOrder}
        onChange={handleSortChange}
        className={styles["sort-select"]}
      >
        <option value="asc">Sort by Likes (Ascending)</option>
        <option value="desc">Sort by Likes (Descending)</option>
      </select>
      {data.map((item, index) => (
        <div key={index} className={styles["card-styles"]}>
          <CardHeader>
            <header className={styles["card-header"]}>
              <p>New</p>
              <p>Likes: {item.likes}</p>
              <button onClick={() => handleLike(item.id)}>Like</button>
            </header>
          </CardHeader>
          <CardContent data={item} />
          <CardFooter>
            <footer className={styles["card-footer"]}>
              <div
                className={styles["card-footer-content"]}
                onClick={() => handleCardClick(item.id.toString())}
              >
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
