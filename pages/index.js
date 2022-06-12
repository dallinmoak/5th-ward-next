import Head from 'next/head';
import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <div className={styles['container']}>
      <h1 className={styles['home-text']}> Welcome to El Paso 5th ward</h1>
      <em className={styles['home-text']}>
        The El Paso 5th ward of the El Paso Mount Franklin Stake of the Church
        of Jesus Christ of Latter Day Saints
      </em>
      <h3 className={styles['home-text']}>Quick Links</h3>
      <button>View our ward program</button>
      <button>Action 2</button>
      <button>Action 3</button>
      <button>Action 4</button>
      <button>Action 5</button>
    </div>
  );
}
