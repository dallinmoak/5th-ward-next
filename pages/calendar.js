import styles from '../styles/pages.module.scss'
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';

import Link from 'next/link';
import calendarUrl from '../common/calendar';

export default function Calendar() {
  const nav = navItem("Calendar")
  return (
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <h1>{nav.name}</h1>
      <p className={styles['bottom-margin']}>
        The official ward calendar is available at <a className={styles['message-link']} href="https://www.churchofjesuschrist.org" target="_blank" rel="noreferrer">churchofjesuschrist.org</a>, but you can also view the youth calendars on the <a className={styles['message-link']}><Link href={navItem("Young Men").route}>Young Men</Link></a> and <a className={styles['message-link']}><Link href={navItem("Young Women").route}>Young Women</Link></a> pages.
      </p>
      <div className={styles['quick-links']}>
        <a href='https://www.churchofjesuschrist.org/calendar' target="_blank" rel="noreferrer">Official ward calendar</a>
        <a href={calendarUrl('yw')} target="_blank" rel="noreferrer">Young Women google Calendar</a>
        <a href={calendarUrl('ym')} target="_blank" rel="noreferrer">Young Men google Calendar</a>
        <a href={calendarUrl('all')} target="_blank" rel="noreferrer">All Youth google Calendar</a>
      </div>
    </div>
  );
}