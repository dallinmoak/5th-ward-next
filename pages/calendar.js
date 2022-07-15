import styles from '../styles/pages.module.scss'
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';

import Link from 'next/link';
import {calendarUrl} from '../common/calendar';
import GetCalendars from '../components/cal/get-calendars';

export default function Calendar(props) {
  const nav = navItem("Calendar")

  const calNames = ['Youth','Deacons','Teachers','Preists','YW 12-13','YW 14-18','Young Men','Young Women'];

  return (
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <GetCalendars calNames={calNames} includeList={props.includeList}/>
      <p className={styles['bottom-margin']}>
        The official ward calendar is available at <a className={styles['message-link']} href="https://www.churchofjesuschrist.org" target="_blank" rel="noreferrer">churchofjesuschrist.org</a>, but you can also view the youth calendars on the <Link className={styles['message-link']} href={navItem("Young Men").route}>Young Men</Link> and <Link className={styles['message-link']} href={navItem("Young Women").route}>Young Women</Link> pages.
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