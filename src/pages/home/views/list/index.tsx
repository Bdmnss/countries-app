import Card from '../../components/Card/Card';
import Hero from '../../components/Hero/Hero';
import styles from './Index.module.css';
import { State, Action } from '../../components/Card/cardReducer';

interface CardPageProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const CardPage: React.FC<CardPageProps> = ({ state, dispatch }) => {
  return (
    <main className={styles['main']}>
      <Hero />
      <Card state={state} dispatch={dispatch} />
    </main>
  );
};

export default CardPage;
