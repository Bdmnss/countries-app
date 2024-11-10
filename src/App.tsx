import { Suspense, lazy, useReducer, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/default/layout';
import NotFound from './pages/404';
import Loading from './Components/base/Loading/Loading';
import ArticlePage from './pages/article/views/article';
import LanguageSwitcher from './Components/base/LanguageSwitcher/LanguageSwitcher';
import {
  initialState,
  reducer,
} from './pages/home/components/Card/cardReducer';
import { useFetchCountries } from './api/countriesApi';

const CardPage = lazy(() => import('./pages/home/views/list'));
const About = lazy(() => import('./pages/about/views/list'));
const Contact = lazy(() => import('./pages/contact/views/list'));

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data: countries, isLoading, error } = useFetchCountries('asc', 10);

  useEffect(() => {
    if (countries) {
      const allCountries = countries.pages.flat();
      dispatch({ type: 'SET_DATA', payload: allCountries });
    }
  }, [countries]);

  if (isLoading) return <Loading />;
  if (error) return <div>Error loading countries</div>;

  return (
    <>
      <LanguageSwitcher />
      <Routes>
        <Route path=":lang" element={<Layout />}>
          <Route
            path="cities"
            element={
              <Suspense fallback={<Loading />}>
                <CardPage state={state} dispatch={dispatch} />
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
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<Navigate to="/en/cities" />} />
      </Routes>
    </>
  );
};

export default App;
