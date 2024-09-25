import styles from "./CardContent.module.css";

interface CardContentProps {
  children: React.ReactNode;
}

const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return <div className={styles["card-styles"]}>{children}</div>;
};

export default CardContent;
