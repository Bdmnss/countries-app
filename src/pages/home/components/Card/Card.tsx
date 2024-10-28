import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardContent from '../card-content/CardContent';
import CardFooter from '../card-footer/CardFooter';
import CardHeader from '../card-header/CardHeader';
import styles from './Card.module.css';
import CardForm from '../card-form/CardForm';
import { State, Action } from './cardReducer';

interface CardPageProps {
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
    default:
      return text;
  }
};

const CardPage: React.FC<CardPageProps> = ({ state, dispatch }) => {
  const [errors, setErrors] = useState({
    name: '',
    duration: '',
    price: '',
    about: '',
  });
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const handleCardClick = (id: number) => {
    const city = state.data.find((item) => item.id === id);
    if (city) {
      navigate(`/${lang}/cities/${id}`, { state: { city } });
    }
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    dispatch({ type: 'LIKE_CITY', payload: id });
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    dispatch({ type: 'DELETE_CITY', payload: id });
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

    dispatch({ type: 'ADD_CITY' });
  };

  const sortedData = [...state.data]
    .filter((item) => !item.deleted)
    .sort((a, b) => {
      if (state.sortOrder === 'asc') {
        return a.likes - b.likes;
      } else {
        return b.likes - a.likes;
      }
    })
    .concat(state.data.filter((item) => item.deleted));

  return (
    <div className={styles['card-container']}>
      <CardForm
        state={state}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        errors={errors}
      />
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className={styles['arrow-svg']}
                >
                  <path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z" />
                </svg>
                <button
                  className={styles['delete-button']}
                  onClick={(e) => handleDelete(e, item.id)}
                >
                  {item.deleted
                    ? lang === 'ka'
                      ? translateToGeorgian('Recover')
                      : 'Recover'
                    : lang === 'ka'
                      ? translateToGeorgian('Delete')
                      : 'Delete'}
                </button>
              </div>
            </footer>
          </CardFooter>
        </div>
      ))}
    </div>
  );
};

export default CardPage;
