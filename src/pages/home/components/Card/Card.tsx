import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useVirtualizer } from '@tanstack/react-virtual';
import CardContent from '../card-content/CardContent';
import CardFooter from '../card-footer/CardFooter';
import CardHeader from '../card-header/CardHeader';
import styles from './Card.module.css';
import { State, Action, IData } from './cardReducer';
import CardForm from '../card-form/CardForm';
import OTPInput from '../OTP/OTPInput';
import EditForm from '../editForm.tsx/EditForm';
import {
  useFetchCountries,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const sortOrder = searchParams.get('_sort') || 'likes';

  const { data: countries, isLoading, error } = useFetchCountries(sortOrder);
  const addCountryMutation = useAddCountry();
  const updateCountryMutation = useUpdateCountry();
  const deleteCountryMutation = useDeleteCountry();

  useEffect(() => {
    if (countries) {
      dispatch({ type: 'SET_DATA', payload: countries });
    }
  }, [countries, dispatch]);

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
    const order = event.target.value;
    setSearchParams({ _sort: order });
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

  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: state.data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading countries</div>;

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
        value={sortOrder}
        onChange={handleSortChange}
        className={styles['sort-select']}
      >
        <option value="likes">
          {lang === 'ka'
            ? translateToGeorgian('Sort by Likes (Ascending)')
            : 'Sort by Likes (Ascending)'}
        </option>
        <option value="-likes">
          {lang === 'ka'
            ? translateToGeorgian('Sort by Likes (Descending)')
            : 'Sort by Likes (Descending)'}
        </option>
      </select>
      <div ref={parentRef} className={styles['virtual-list']}>
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const item = state.data[virtualRow.index];
            return (
              <div
                key={virtualRow.key}
                className={`${styles['card-styles']} ${
                  item.deleted ? styles['card-deleted'] : ''
                }`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualRow.start}px)`,
                }}
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
                      <p>
                        {lang === 'ka' ? translateToGeorgian('View') : 'View'}
                      </p>
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
