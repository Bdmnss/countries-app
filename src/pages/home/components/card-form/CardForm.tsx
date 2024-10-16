import React from "react";
import styles from "./CardForm.module.css";
import { IData } from "../Card/cardReducer";

interface CardFormProps {
  state: {
    newCity: IData;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: {
    name: string;
    duration: string;
    price: string;
    about: string;
  };
}

const CardForm: React.FC<CardFormProps> = ({
  state,
  handleInputChange,
  handleFormSubmit,
  errors,
}) => {
  return (
    <form onSubmit={handleFormSubmit} className={styles["city-form"]}>
      <div className={styles["form-group"]}>
        <input
          type="text"
          name="name"
          value={state.newCity.name}
          onChange={handleInputChange}
          placeholder="City Name"
        />
        {errors.name && (
          <p className={styles["error-message"]}>{errors.name}</p>
        )}
      </div>
      <div className={styles["form-group"]}>
        <input
          type="text"
          name="duration"
          value={state.newCity.duration}
          onChange={handleInputChange}
          placeholder="Tour Length"
        />
        {errors.duration && (
          <p className={styles["error-message"]}>{errors.duration}</p>
        )}
      </div>
      <div className={styles["form-group"]}>
        <input
          type="number"
          name="price"
          value={state.newCity.price}
          onChange={handleInputChange}
          placeholder="Price"
        />
        {errors.price && (
          <p className={styles["error-message"]}>{errors.price}</p>
        )}
      </div>
      <div className={styles["form-group"]}>
        <input
          type="text"
          name="about"
          value={state.newCity.about}
          onChange={handleInputChange}
          placeholder="About"
        />
        {errors.about && (
          <p className={styles["error-message"]}>{errors.about}</p>
        )}
      </div>
      <button type="submit">Add City</button>
    </form>
  );
};

export default CardForm;
