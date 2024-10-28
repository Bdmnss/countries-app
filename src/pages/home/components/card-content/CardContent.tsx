import { useParams } from 'react-router-dom';
import styles from './CardContent.module.css';

interface CountryData {
  id: string;
  name: string;
  duration: string;
  price: number;
  translations?: {
    ka: {
      name: string;
      duration: string;
      about: string;
    };
  };
}

interface CardContentProps {
  data: CountryData;
}

const CardContent: React.FC<CardContentProps> = ({ data }) => {
  const { lang } = useParams<{ lang: string }>();

  const translatedData =
    lang === 'ka' && data.translations?.ka ? data.translations.ka : data;

  return (
    <div className={styles['card-content-styles']}>
      <h2>
        {lang === 'ka' ? 'ქალაქი' : 'City'}: {translatedData.name}
      </h2>
      <p>
        {lang === 'ka' ? 'ტურის ხანგრძლივობა' : 'Tour Length'}:{' '}
        {translatedData.duration}
      </p>
      <p>
        {lang === 'ka' ? 'ფასი' : 'Price'}: {data.price}$
      </p>
    </div>
  );
};

export default CardContent;
