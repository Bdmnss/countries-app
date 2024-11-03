import React from 'react';
import styles from './EditForm.module.css';
import { IData } from '../Card/cardReducer';

interface EditFormProps {
  editingCity: IData;
  handleEditInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleToggleGeorgianFields: () => void;
  setEditingCity: React.Dispatch<React.SetStateAction<IData | null>>;
  showGeorgianFields: boolean;
}

const EditForm: React.FC<EditFormProps> = ({
  editingCity,
  handleEditInputChange,
  handleEditFileChange,
  handleEditFormSubmit,
  handleToggleGeorgianFields,
  setEditingCity,
  showGeorgianFields,
}) => {
  return (
    <form onSubmit={handleEditFormSubmit} className={styles['edit-form']}>
      <h2>Edit Country</h2>
      <input
        type="text"
        name="name"
        value={editingCity.name}
        onChange={handleEditInputChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="duration"
        value={editingCity.duration}
        onChange={handleEditInputChange}
        placeholder="Duration"
      />
      <input
        type="number"
        name="price"
        value={editingCity.price}
        onChange={handleEditInputChange}
        placeholder="Price"
      />
      <input
        type="text"
        name="about"
        value={editingCity.about}
        onChange={handleEditInputChange}
        placeholder="About"
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleEditFileChange}
      />
      <button type="submit">Save</button>
      <button type="button" onClick={() => setEditingCity(null)}>
        Cancel
      </button>
      <button type="button" onClick={handleToggleGeorgianFields}>
        {showGeorgianFields ? 'Hide Georgian Fields' : 'Show Georgian Fields'}
      </button>
      {showGeorgianFields && (
        <>
          <input
            type="text"
            name="name_ka"
            value={editingCity.translations.ka.name}
            onChange={handleEditInputChange}
            placeholder="Name (Georgian)"
          />
          <input
            type="text"
            name="duration_ka"
            value={editingCity.translations.ka.duration}
            onChange={handleEditInputChange}
            placeholder="Duration (Georgian)"
          />
          <input
            type="text"
            name="about_ka"
            value={editingCity.translations.ka.about}
            onChange={handleEditInputChange}
            placeholder="About (Georgian)"
          />
        </>
      )}
    </form>
  );
};

export default EditForm;
