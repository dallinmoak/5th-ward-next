import styles from '../styles/pages.module.scss'
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';

import {useState} from 'react';

import Link from 'next/link';
import calendarUrl from '../common/calendar';

export default function Calendar() {

  const [ cal, setCal ] = useState();

  const calsToInclude = [
    'ep5thwardyouth%40gmail.com',
    // '54ak8d4d51nm0hk44u3e3f501c%40group.calendar.google.com',
  ]
  const nav = navItem("Calendar")
  function getCals(ids){
    const cals = ids.join(',');
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`http://localhost:3000//api/calendars?calendars=${cals}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      // console.log("results:", result);
      setCal(result);
    })
    .catch(error => {
      console.log('error', error)
    });
  }
  return (
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <h1>{nav.name}</h1>
      <p className={styles['bottom-margin']}>
        <button onClick={() => {getCals(calsToInclude)}}>getCals</button>
        {/* {cal? cal : null} */}
      </p>
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