import styles from '../styles/pages.module.scss';

import navItem from '../common/nav-item';
import PageHead from '../components/page-head';

import calendarUrl from '../common/calendar';
import PageMessage from '../components/page-message';
import messages from '../common/page-messages';


export default function YoungWomen() {
  const nav = navItem('Young Women');
  return(
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <h1>{nav.name}</h1>
      <PageMessage messages={messages}/>
      <iframe className={styles['calendar-widget']} src={calendarUrl}></iframe>
    </div>
  );
}