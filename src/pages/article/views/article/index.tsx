import { useParams } from 'react-router-dom';
import styles from './ArticlePage.module.css';
import { State } from '@/pages/home/components/Card/cardReducer';

interface ArticlePageProps {
  state: State;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ state }) => {
  const { id, lang } = useParams<{ id: string; lang: string }>();
  const articleId = parseInt(id ?? '0', 10);
  const article = state.data.find((item) => item.id === articleId);

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
