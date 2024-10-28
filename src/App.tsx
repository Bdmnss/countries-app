import { Suspense, lazy, useReducer, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/default/layout';
import NotFound from './pages/404';
import Loading from './Components/base/Loading/Loading';
import LanguageSwitcher from './Components/base/LanguageSwitcher/LanguageSwitcher';
import {
  initialState,
  reducer,
} from './pages/home/components/Card/cardReducer';
import json from '@/data.json';

const CardPage = lazy(() => import('./pages/home/views/list'));
const About = lazy(() => import('./pages/about/views/list'));
const Contact = lazy(() => import('./pages/contact/views/list'));
const ArticlePage = lazy(() => import('./pages/article/views/article'));

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_DATA', payload: json });
  }, []);

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
                <ArticlePage state={state} />
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
        <Route path="/" element={<Navigate to={'/ka/cities'} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
