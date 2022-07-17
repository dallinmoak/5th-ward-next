import styles from '../styles/pages.module.scss'
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';

import Link from 'next/link';

export default function Calendar() {
  const nav = navItem("Calendar Portal")

  return (
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <p className={[styles['bottom-margin'],styles['message-link-container']].join(' ')}>
        The official ward calendar is available at <a href="https://www.churchofjesuschrist.org" target="_blank" rel="noreferrer">churchofjesuschrist.org</a>, but you can also view the youth calendars on the <Link href={navItem("Ward Calendar").route}>Ward Calendar</Link> page.
      </p>
      <div className={styles['quick-links']}>
        <a href='https://www.churchofjesuschrist.org/calendar' target="_blank" rel="noreferrer">Official ward calendar</a>
        <Link href={navItem("Ward Calendar").route}>Unofficial ward calendar</Link>
      </div>
    </div>
  );
}