import styles from '../styles/home.module.scss';
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
      <h3 className={styles['home-text']}>Quick Links</h3>
      <div className={styles['quick-links']}>
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
