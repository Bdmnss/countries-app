export default function Hero() {
  const travelToGeorgiaArr = ["TravelToGeorgia"];
  const splitted = travelToGeorgiaArr[0].split("");
  return (
    <div className="hero">
      {splitted.map((item, index) => (
        <h2 style={index % 2 === 0 ? { color: "red" } : { color: "white" }}>
          {item}
        </h2>
      ))}
    </div>
  );
}
