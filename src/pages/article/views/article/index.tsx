import { useParams } from 'react-router-dom';
import styles from './ArticlePage.module.css';
import { useFetchCountry } from '../../../../api/countriesApi';

const ArticlePage: React.FC = () => {
  const { id, lang } = useParams<{ id: string; lang: string }>();
  const { data: article, isLoading, error } = useFetchCountry(id!);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading country</div>;

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
