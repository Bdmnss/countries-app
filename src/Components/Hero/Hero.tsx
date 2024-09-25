import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  const travelToGeorgiaArr = ["TravelToGeorgia"];
  const splitted = travelToGeorgiaArr[0].split("");
  return (
    <div className={styles["hero-overlay-styles"]}>
      <div className={styles["hero-styles"]}>
        {splitted.map((item, index) => (
          <h2
            key={index}
            style={index % 2 === 0 ? { color: "red" } : { color: "white" }}
          >
            {item}
          </h2>
        ))}
      </div>
    </div>
  );
};

export default Hero;
