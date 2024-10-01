import { Suspense, lazy } from "react";
import styles from "./Index.module.css";
import Loading from "@/Components/base/Loading/Loading";

const Card = lazy(() => import("../../components/Card/Card"));
const Hero = lazy(() => import("../../components/Hero/Hero"));

const CardPage = () => {
  return (
    <main className={styles["main"]}>
      <Suspense fallback={<Loading />}>
        <Hero />
        <Card />
      </Suspense>
    </main>
  );
};

export default CardPage;
