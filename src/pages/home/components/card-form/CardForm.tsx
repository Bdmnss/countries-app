import React, { useState } from 'react';
import styles from './CardForm.module.css';
import { IData } from '../Card/cardReducer';

interface CardFormProps {
  state: {
    newCity: IData;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  handleFileChange,
  errors,
}) => {
  const [showGeorgianFields, setShowGeorgianFields] = useState<boolean>(false);

  const handleToggleGeorgianFields = () => {
    setShowGeorgianFields(!showGeorgianFields);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles['card-form']}>
      <h2>Add New Country</h2>
      <input
        type="text"
        name="name"
        value={state.newCity.name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      {errors.name && <p className={styles['error']}>{errors.name}</p>}
      <input
        type="text"
        name="duration"
        value={state.newCity.duration}
        onChange={handleInputChange}
        placeholder="Duration"
      />
      {errors.duration && <p className={styles['error']}>{errors.duration}</p>}
      <input
        type="number"
        name="price"
        value={state.newCity.price}
        onChange={handleInputChange}
        placeholder="Price"
      />
      {errors.price && <p className={styles['error']}>{errors.price}</p>}
      <input
        type="text"
        name="about"
        value={state.newCity.about}
        onChange={handleInputChange}
        placeholder="About"
      />
      {errors.about && <p className={styles['error']}>{errors.about}</p>}
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button type="button" onClick={handleToggleGeorgianFields}>
        {showGeorgianFields ? 'Hide Georgian Fields' : 'Show Georgian Fields'}
      </button>
      {showGeorgianFields && (
        <>
          <input
            type="text"
            name="name_ka"
            value={state.newCity.translations.ka.name}
            onChange={handleInputChange}
            placeholder="Name (Georgian)"
          />
          <input
            type="text"
            name="duration_ka"
            value={state.newCity.translations.ka.duration}
            onChange={handleInputChange}
            placeholder="Duration (Georgian)"
          />
          <input
            type="text"
            name="about_ka"
            value={state.newCity.translations.ka.about}
            onChange={handleInputChange}
            placeholder="About (Georgian)"
          />
        </>
      )}
      <button type="submit">Add Country</button>
    </form>
  );
};

export default CardForm;
