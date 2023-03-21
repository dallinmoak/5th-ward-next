import styles from '../styles/home.module.scss';
import pageStyles from '../styles/pages.module.scss';
import Link from 'next/link';

import quickLinks from '../common/quick-links';
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';

export default function Home() {
  return (
    <div className={styles['container']}>
      <PageHead nav={navItem("Home")}/>
      <h1 className={styles['home-text']}> Welcome to El Paso 5th Ward</h1>
      <em className={styles['home-text']}>
        The El Paso 5th Ward of the El Paso Mount Franklin Stake of the Church
        of Jesus Christ of Latter Day Saints
      </em>
      <h2>!NEW!</h2>
      <p>please click <a className=styles["message-link"] href="https://docs.google.com/forms/d/e/1FAIpQLSfcF3SklQhhkJoQJABv3H-3oSokWWakZk9XOFCKKDavp4p6ig/viewform?usp=sf_link" target="_blank" rel="noreferrer">here</a> to take the ward technology survey. Thanks!</p>
      <h3 className={styles['home-text']}>Quick Links</h3>
      <div className={pageStyles['quick-links']}>
        {quickLinks.map((link, index) => {
          if (link.type =='internal'){
            return (
              <Link href={link.content} key={index}>{link.name}</Link>
            )
          } else {
            return (
              <a href={link.content} key={index} target='_blank' rel='noreferrer'>{link.name}</a>
            );
          }
        })}
      </div>
    </div>
  );
}
