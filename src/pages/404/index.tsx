import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles["notfound-container"]}>
      <h1 className={styles["notfound-title"]}>404 - Page Not Found</h1>
      <p className={styles["notfound-content"]}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className={styles["home-link"]}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
