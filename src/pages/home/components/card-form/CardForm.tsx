import React, { useState } from "react";
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
  const [image, setImage] = useState<string | null>(null);
  const [showGeorgianFields, setShowGeorgianFields] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        handleInputChange({
          target: {
            name: "image",
            value: reader.result as string,
          },
        } as React.ChangeEvent<HTMLInputElement>);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a JPG or PNG file.");
    }
  };

  const handleTranslationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [field, lang] = name.split("_");
    if (lang === "ka") {
      state.newCity.translations = {
        ...state.newCity.translations,
        ka: {
          ...state.newCity.translations?.ka,
          [field]: value,
        },
      };
    }
    handleInputChange(e);
  };

  const toggleGeorgianFields = () => {
    setShowGeorgianFields(!showGeorgianFields);
  };

  console.log(state.newCity);

  return (
    <form onSubmit={handleFormSubmit} className={styles["city-form"]}>
      <h3>English</h3>
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
      <button
        type="button"
        onClick={toggleGeorgianFields}
        className={styles["toggle-button"]}
      >
        {showGeorgianFields ? "Hide Georgian Fields" : "Show Georgian Fields"}
      </button>
      {showGeorgianFields && (
        <>
          <h3>Georgian</h3>
          <div className={styles["form-group"]}>
            <input
              type="text"
              name="name_ka"
              value={state.newCity.translations?.ka.name || ""}
              onChange={handleTranslationChange}
              placeholder="City Name (Georgian)"
            />
          </div>
          <div className={styles["form-group"]}>
            <input
              type="text"
              name="duration_ka"
              value={state.newCity.translations?.ka.duration || ""}
              onChange={handleTranslationChange}
              placeholder="Tour Length (Georgian)"
            />
          </div>
          <div className={styles["form-group"]}>
            <input
              type="text"
              name="about_ka"
              value={state.newCity.translations?.ka.about || ""}
              onChange={handleTranslationChange}
              placeholder="About (Georgian)"
            />
          </div>
        </>
      )}
      <div className={styles["form-group"]}>
        <input
          type="file"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
        />
        {image && (
          <img src={image} alt="Preview" className={styles["image-preview"]} />
        )}
      </div>
      <button type="submit">Add City</button>
    </form>
  );
};

export default CardForm;
