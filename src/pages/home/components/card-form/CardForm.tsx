import React from "react";
import styles from "./CardForm.module.css";
import { IData } from "../Card/cardReducer";

interface CardFormProps {
  state: {
    newCity: IData;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const CardForm: React.FC<CardFormProps> = ({
  state,
  handleInputChange,
  handleFormSubmit,
}) => {
  return (
    <form onSubmit={handleFormSubmit} className={styles["city-form"]}>
      <input
        type="text"
        name="name"
        value={state.newCity.name}
        onChange={handleInputChange}
        placeholder="City Name"
        required
      />
      <input
        type="text"
        name="duration"
        value={state.newCity.duration}
        onChange={handleInputChange}
        placeholder="Tour Length"
        required
      />
      <input
        type="number"
        name="price"
        value={state.newCity.price}
        onChange={handleInputChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="about"
        value={state.newCity.about}
        onChange={handleInputChange}
        placeholder="About"
        required
      />
      <button type="submit">Add City</button>
    </form>
  );
};

export default CardForm;
