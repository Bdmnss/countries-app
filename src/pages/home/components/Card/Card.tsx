import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardContent from '../card-content/CardContent';
import CardFooter from '../card-footer/CardFooter';
import CardHeader from '../card-header/CardHeader';
import styles from './Card.module.css';
import { State, Action, IData } from './cardReducer';
import CardForm from '../card-form/CardForm';
import OTPInput from '../OTP/OTPInput';
import EditForm from '../editForm.tsx/EditForm';
import {
  useAddCountry,
  useUpdateCountry,
  useDeleteCountry,
} from '../../../../api/countriesApi';

interface CardProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const translateToGeorgian = (text: string) => {
  switch (text) {
    case 'New':
      return 'ახალი';
    case 'Likes':
      return 'მოწონებები';
    case 'View':
      return 'ნახვა';
    case 'Sort by Likes (Ascending)':
      return 'დალაგება მოწონებების მიხედვით (ზრდადობით)';
    case 'Sort by Likes (Descending)':
      return 'დალაგება მოწონებების მიხედვით (კლებადობით)';
    case 'Like':
      return 'მოწონება';
    case 'Delete':
      return 'წაშლა';
    case 'Recover':
      return 'აღდგენა';
    case 'Edit':
      return 'რედაქტირება';
    default:
      return text;
  }
};

const Card: React.FC<CardProps> = ({ state, dispatch }) => {
  const [errors, setErrors] = useState({
    name: '',
    duration: '',
    price: '',
    about: '',
  });
  const [otp, setOtp] = useState('');
  const [editingCity, setEditingCity] = useState<IData | null>(null);
  const [showGeorgianFields, setShowGeorgianFields] = useState<boolean>(false);

  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const addCountryMutation = useAddCountry();
  const updateCountryMutation = useUpdateCountry();
  const deleteCountryMutation = useDeleteCountry();

  const handleCardClick = (id: string) => {
    const city = state.data.find((item) => item.id === id);
    if (city) {
      navigate(`/${lang}/cities/${id}`, { state: { city } });
    }
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    dispatch({ type: 'LIKE_CITY', payload: id });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    deleteCountryMutation.mutate(id);
  };

  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    const city = state.data.find((item) => item.id === id);
    if (city) {
      setEditingCity(city);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value as 'asc' | 'desc';
    dispatch({ type: 'SET_SORT_ORDER', payload: order });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: 'UPDATE_NEW_CITY',
      payload: { name, value: name === 'price' ? Number(value) : value },
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({
          type: 'UPDATE_NEW_CITY',
          payload: { name: 'image', value: reader.result as string },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingCity) {
      const { name, value } = e.target;
      setEditingCity({
        ...editingCity,
        [name]: name === 'price' ? Number(value) : value,
      });
    }
  };

  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingCity) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingCity({
          ...editingCity,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name:
        state.newCity.name.length < 3
          ? 'Name must be at least 3 characters long'
          : '',
      duration:
        state.newCity.duration.length < 3
          ? 'Duration must be at least 3 characters long'
          : '',
      price: state.newCity.price <= 0 ? 'Price must be greater than 0' : '',
      about:
        state.newCity.about.length < 10
          ? 'About must be at least 10 characters long'
          : '',
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== '');
    if (hasErrors) {
      return;
    }

    addCountryMutation.mutate(state.newCity);
  };

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingCity) {
      updateCountryMutation.mutate(editingCity);
    }
  };

  const handleToggleGeorgianFields = () => {
    setShowGeorgianFields(!showGeorgianFields);
  };

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp);
  };

  const sortedData = Array.isArray(state.data)
    ? [...state.data]
        .filter((item) => !item.deleted)
        .sort((a, b) => {
          if (state.sortOrder === 'asc') {
            return a.likes - b.likes;
          } else {
            return b.likes - a.likes;
          }
        })
        .concat(state.data.filter((item) => item.deleted))
    : [];

  return (
    <div className={styles['card-container']}>
      <div className={styles['otp-section']}>
        <h2>Enter OTP</h2>
        <OTPInput numInputs={6} onChange={handleOtpChange} />
        <p>Entered OTP: {otp}</p>
      </div>
      <CardForm
        state={state}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        handleFileChange={handleFileChange}
        errors={errors}
      />
      {editingCity && (
        <EditForm
          editingCity={editingCity}
          handleEditInputChange={handleEditInputChange}
          handleEditFileChange={handleEditFileChange}
          handleEditFormSubmit={handleEditFormSubmit}
          handleToggleGeorgianFields={handleToggleGeorgianFields}
          setEditingCity={setEditingCity}
          showGeorgianFields={showGeorgianFields}
        />
      )}
      <select
        value={state.sortOrder}
        onChange={handleSortChange}
        className={styles['sort-select']}
      >
        <option value="asc">
          {lang === 'ka'
            ? translateToGeorgian('Sort by Likes (Ascending)')
            : 'Sort by Likes (Ascending)'}
        </option>
        <option value="desc">
          {lang === 'ka'
            ? translateToGeorgian('Sort by Likes (Descending)')
            : 'Sort by Likes (Descending)'}
        </option>
      </select>
      {sortedData.map((item, index) => (
        <div
          key={index}
          className={`${styles['card-styles']} ${
            item.deleted ? styles['card-deleted'] : ''
          }`}
          onClick={() => handleCardClick(item.id)}
        >
          <CardHeader>
            <header className={styles['card-header']}>
              <p>{lang === 'ka' ? translateToGeorgian('New') : 'New'}</p>
              <p>
                {lang === 'ka' ? translateToGeorgian('Likes') : 'Likes'}:{' '}
                {item.likes}
              </p>
              <button onClick={(e) => handleLike(e, item.id)}>
                {lang === 'ka' ? translateToGeorgian('Like') : 'Like'}
              </button>
            </header>
          </CardHeader>
          <CardContent data={item} />
          <CardFooter>
            <footer className={styles['card-footer']}>
              <div className={styles['card-footer-content']}>
                <p>{lang === 'ka' ? translateToGeorgian('View') : 'View'}</p>
              </div>
              <button onClick={(e) => handleEditClick(e, item.id)}>
                {lang === 'ka' ? translateToGeorgian('Edit') : 'Edit'}
              </button>
              <button onClick={(e) => handleDelete(e, item.id)}>
                {lang === 'ka'
                  ? item.deleted
                    ? translateToGeorgian('Recover')
                    : translateToGeorgian('Delete')
                  : item.deleted
                    ? 'Recover'
                    : 'Delete'}
              </button>
            </footer>
          </CardFooter>
        </div>
      ))}
    </div>
  );
};

export default Card;
