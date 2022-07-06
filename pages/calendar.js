import styles from '../styles/pages.module.scss'
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';

import {useState, useEffect} from 'react';

import Link from 'next/link';
import {calendarUrl, getCalIds} from '../common/calendar';

export default function Calendar() {

  const [ cals, setCals ] = useState([]);

  const calsToInclude = getCalIds(['youth','deacons','teachers','preists','yw12_13','yw14_18','youngMen','youngWomen'])
  .map( id => { return Buffer.from(id, 'base64').toString('ascii')});

  const nav = navItem("Calendar")
  function getCals(ids){
    fetch(`http://localhost:3000//api/calendars?calendars=${ids.join(',')}`)
    .then(response => response.json())
    .then(result => {
      let calendars = [];
      Object.values(result).forEach( calendar => {
        let events = [];
        const vcal = calendar.vcalendar;
        Object.values(calendar).forEach( calItem => {
          if(calItem.type == "VEVENT"){
            events.push(calItem);
          }
        })
        calendars.push({events: events, vcal: vcal});
      })
      setCals(calendars);
    })
    .catch(error => {
      console.log('error', error)
    });
  }

  useEffect(()=>{
    getCals(calsToInclude);
  },[])

  return (
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <h1>{nav.name}</h1>
      <p className={styles['bottom-margin']}>
        {/* <button onClick={() => {getCals(calsToInclude)}}>getCals</button> */}
        {/* {cals.map( calendar => {
          return (
            <div>
              <h2>calendar: <em>{calendar.vcal['WR-CALNAME']}</em></h2>
              <h4>Events:</h4>
              {calendar.events.map( event => {
                return(<p>{event.summary}: {event.description} - {event.start}</p>)
              })}
            </div>
          )
        })} */}
        
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