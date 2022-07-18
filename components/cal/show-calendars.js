import styles from '../../styles/calendars.module.scss';

import { useEffect } from 'react';

import EventDetails from './event-details'

export default function ShowCalendars(props) {

  useEffect(()=> {},[props.includeList])

  let detailedEvents = props.events.map((event, index)=> {
    let includedItem = props.includeList.find(item => item.label == event.calendar['WR-CALNAME']);
    if(!includedItem){
      event.color = '#555555';
      event.index = index;
      return (event);
    }
    if(includedItem.included){
      event.color = includedItem.color;
      event.index = index;
      return (event);
    }
  }).filter(e => e !== undefined);

  let dateList = Array.from(new Set(detailedEvents.map(event => {
    if (event.details.start){
      return event.details.start
    }
  }))).map(item =>{
    return { date: item, events: [] };
  })
  

  detailedEvents.forEach(event => {
    let targetDate = event.details.start
    dateList.forEach(dateItem => {
      if(dateItem.date == targetDate){
        dateItem.events.push(event);
      }
    })
  })

  function printEvent(event, index) {
    let summary = event.details.summary;
    let description = event.details.description;
    let location = event.details.location;
    let calendar = event.calendar["WR-CALNAME"];
    let calShort = calendar;
    if(event.calendar['WR-CALNAME'] == "Young Women"){
      calShort = "YW";
    }
    if(event.calendar['WR-CALNAME'] == "Young Men"){
      calShort = "YM";
    }
    let timeformat = {hour: 'numeric', minute: 'numeric', hour12: true }
    let startTime = new Intl.DateTimeFormat('en-us', timeformat).format(new Date(event.details.start));
    let allDay = event.details.datetype == 'date' ? true: false;
    return(
      <div key={index} style={{ backgroundColor: `#${event.color}`, color: "#fff"}} className={styles['event-item']}>
        <div>{allDay ? 'All day' : startTime}</div>
        <div>
          <div className={styles['event-summary']}>{summary}</div>
          {description?
            <div className={styles['event-description']}>{description}</div> :
            null
          }
          {location? 
            <div className={styles['event-location']}>{location}</div>:
            null
          }
        </div>
        <div className={styles['event-calendar']}>{calShort}</div>
      </div>
    )
  }

  function printDate(date, index){
    let currentDate = new Date(date.date);
    let format = { weekday: 'short'}
    let format2 = { month: 'short', day: 'numeric' }
    let dateFormatted = new Intl.DateTimeFormat('en-us', format).format(currentDate);
    let dateFormatted2 = new Intl.DateTimeFormat('en-us', format2).format(currentDate);

    return(
      <div key={index} className={styles['date-item-wrapper']}>
        <div className={styles['date-section']}>
          <div>
            {dateFormatted}
          </div>
          <div className={styles['date-month']}>
            {dateFormatted2}
          </div>
        </div>
        <div className={styles['event-items']}>
          {date.events.map((event, index) =>{
            return <EventDetails event={event} key={index} setModal={props.setModal}/>
          })}
        </div>
      </div>
    )
  }

  function printAllDates(){
    if(dateList.length>0){
      return dateList.map((date, index) => {
        return (
          <div key={index}>
            {printDate(date,index)}
            <div className={styles['date-item-divider']}/>
          </div>
        )
      });
    } else {
      return "no events to show";
    }
  }

  return(
    <div className={styles['calendar-items']}>
      {printAllDates()}
    </div>
  )
}