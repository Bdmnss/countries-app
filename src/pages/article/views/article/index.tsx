import { useParams } from "react-router-dom";
import styles from "./ArticlePage.module.css";
import data from "@/data.json";

const ArticlePage = () => {
  const { id } = useParams();
  const articleId = parseInt(id ?? "0", 10);
  const article = data.find((item) => item.id === articleId);

  if (!article) {
    return <div className={styles["article-container"]}>Article not found</div>;
  }

  return (
    <div className={styles["article-container"]}>
      <h1 className={styles["article-title"]}>{article.name}</h1>
      <div className={styles["article-details"]}>
        <p>
          <strong>Duration:</strong> {article.duration}
        </p>
        <p>
          <strong>Price:</strong> ${article.price}
        </p>
        <p>{article.about}</p>
      </div>
    </div>
  );
};

export default ArticlePage;
