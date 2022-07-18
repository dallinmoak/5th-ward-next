import styles from '../styles/pages.module.scss'
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';
import SundaySchoolWidget from '../components/sunday-school-widget';

import PageMessage from '../components/page-message';
import messages from '../common/page-messages';

export default function ReliefSociety() {
  const nav = navItem("Relief Society");
  let myMessages = [];
  messages.map(message => {
    if(message.pages.includes(nav.name)){
      myMessages.push(message);
    }
  });
  return(
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <h1 className={styles['bottom-margin']}>{nav.name}</h1>
      <PageMessage messages={myMessages}/>
      <h2>Sunday Lesson:</h2>
      <SundaySchoolWidget type="Relief Society"></SundaySchoolWidget>
    </div>
  );
}