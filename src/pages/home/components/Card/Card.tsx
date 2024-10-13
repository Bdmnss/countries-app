import { useNavigate } from "react-router-dom";
import json from "@/data.json";
import CardContent from "../card-content/CardContent";
import CardFooter from "../card-footer/CardFooter";
import CardHeader from "../card-header/CardHeader";
import styles from "./Card.module.css";
import { useReducer, useEffect } from "react";
import { initialState, reducer } from "./cardReducer";
import CardForm from "../card-form/CardForm";

const Card: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "SET_DATA", payload: json });
  }, []);

  const handleCardClick = (id: number) => {
    const city = state.data.find((item) => item.id === id);
    if (city) {
      navigate(`/cities/${id}`, { state: { city } });
    }
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    dispatch({ type: "LIKE_CITY", payload: id });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    dispatch({ type: "DELETE_CITY", payload: id });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value as "asc" | "desc";
    dispatch({ type: "SET_SORT_ORDER", payload: order });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: "UPDATE_NEW_CITY",
      payload: { name, value: name === "price" ? Number(value) : value },
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "ADD_CITY" });
  };

  const sortedData = [...state.data]
    .filter((item) => !item.deleted)
    .sort((a, b) => {
      if (state.sortOrder === "asc") {
        return a.likes - b.likes;
      } else {
        return b.likes - a.likes;
      }
    })
    .concat(state.data.filter((item) => item.deleted));

  return (
    <div className={styles["card-container"]}>
      <CardForm
        state={state}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
      />
      <select
        value={state.sortOrder}
        onChange={handleSortChange}
        className={styles["sort-select"]}
      >
        <option value="asc">Sort by Likes (Ascending)</option>
        <option value="desc">Sort by Likes (Descending)</option>
      </select>
      {sortedData.map((item, index) => (
        <div
          key={index}
          className={`${styles["card-styles"]} ${
            item.deleted ? styles["card-deleted"] : ""
          }`}
          onClick={() => handleCardClick(item.id)}
        >
          <CardHeader>
            <header className={styles["card-header"]}>
              <p>New</p>
              <p>Likes: {item.likes}</p>
              <button onClick={(e) => handleLike(e, item.id)}>Like</button>
            </header>
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
                <button
                  className={styles["delete-button"]}
                  onClick={(e) => handleDelete(e, item.id)}
                >
                  {item.deleted ? "Recover" : "Delete"}
                </button>
              </div>
            </footer>
          </CardFooter>
        </div>
      ))}
    </div>
  );
};

export default Card;
