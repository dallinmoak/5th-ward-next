import styles from '../styles/pages.module.scss';

import navItem from '../common/nav-item';
import PageHead from '../components/page-head';

import calendarUrl from '../common/calendar';
import PageMessage from '../components/page-message';
import messages from '../common/page-messages';

export default function YoungMen() {
  const nav = navItem('Young Men');
  let myMessages = [];
  messages.map(message => {
    if(message.pages.includes(nav.name)){
      myMessages.push(message);
    }
  });
  return(
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <h1>{nav.name}</h1>
      <PageMessage messages={myMessages}/>
      <iframe className={styles['calendar-widget']} src={calendarUrl('ym')}/>
    </div>
  );
}