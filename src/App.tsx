import "@/App.css";
import Card from "@/Components/Card/Card";
import Hero from "@/Components/Hero/Hero";
import Layout from "@/layout/layout";

const App = () => {
  return (
    <>
      <Layout>
        <main>
          <Hero />
          <Card />
        </main>
      </Layout>
    </>
  );
};

export default App;
