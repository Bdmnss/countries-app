import "./App.css";
import Card from "./Components/Card/Card";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Card />
      </main>
    </>
  );
};

export default App;
