import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/default/layout";
import NotFound from "./pages/404";
import Loading from "./Components/base/Loading/Loading";
import ArticlePage from "./pages/article/views/article";
import LanguageSwitcher from "./Components/base/LanguageSwitcher/LanguageSwitcher";

const CardPage = lazy(() => import("./pages/home/views/list"));
const About = lazy(() => import("./pages/about/views/list"));
const Contact = lazy(() => import("./pages/contact/views/list"));

const App = () => {
  return (
    <>
      <LanguageSwitcher />
      <Routes>
        <Route path="/:lang" element={<Layout />}>
          <Route
            path="cities"
            element={
              <Suspense fallback={<Loading />}>
                <CardPage />
              </Suspense>
            }
          />
          <Route
            path="cities/:id"
            element={
              <Suspense fallback={<Loading />}>
                <ArticlePage />
              </Suspense>
            }
          />
          <Route
            path="about"
            element={
              <Suspense fallback={<Loading />}>
                <About />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<Loading />}>
                <Contact />
              </Suspense>
            }
          />
        </Route>
        <Route path="/" element={<Navigate to={"/ka/cities"} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
