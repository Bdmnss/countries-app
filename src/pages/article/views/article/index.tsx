import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './ArticlePage.module.css';
import { useEffect, useState } from 'react';
import { IData } from '../../../home/components/Card/cardReducer';

const ArticlePage: React.FC = () => {
  const { id, lang } = useParams<{ id: string; lang: string }>();
  const [article, setArticle] = useState<IData | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/countries/${id}`)
      .then((response) => {
        setArticle(response.data);
      })
      .catch((error) => {
        console.error('Error fetching country:', error);
      });
  }, [id]);

  if (!article) {
    return <div className={styles['article-container']}>Article not found</div>;
  }

  const translatedArticle =
    lang === 'ka' && article.translations?.ka
      ? article.translations.ka
      : article;

  return (
    <div className={styles['article-container']}>
      <h1 className={styles['article-title']}>{translatedArticle.name}</h1>
      <div className={styles['article-details']}>
        <p>
          <strong>
            {lang === 'ka' ? 'ტურის ხანგრძლივობა' : 'Tour Length'}:
          </strong>{' '}
          {translatedArticle.duration}
        </p>
        <p>
          <strong>{lang === 'ka' ? 'ფასი' : 'Price'}:</strong> ${article.price}
        </p>
        <p>{translatedArticle.about}</p>
        <img
          src={article.image}
          alt={translatedArticle.name}
          className={styles['article-image']}
        />
      </div>
    </div>
  );
};

export default ArticlePage;
