import styles from "./Header.module.css";

const Header: React.FC = () => {
  const navigation = ["Home", "About", "Travel"];
  return (
    <header className={styles["header-styles"]}>
      <h1 className={styles["header-h1-styles"]}>Travel To Georgia</h1>
      <nav className={styles["header-nav-styles"]}>
        {navigation.map((item, index) => (
          <p key={index} className={styles["header-nav-p-styles"]}>
            {item}
          </p>
        ))}
      </nav>
    </header>
  );
};

export default Header;
