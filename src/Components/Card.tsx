import data from "../country.json";

export default function Card() {
  return (
    <div className="card">
      {data.map((item, index) => {
        return (
          <div key={index} className="card-content">
            <h2>Country: {item.name}</h2>
            <p>Capital: {item.capital}</p>
            <p>Population: {item.population}</p>
          </div>
        );
      })}
    </div>
  );
}
