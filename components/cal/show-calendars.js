import styles from '../../styles/calendars.module.scss';

import { useEffect } from 'react';

import EventDetails from './event-details'

export default function ShowCalendars(props) {

  useEffect(()=> {},[props.includeList])

  let detailedEvents = props.events.map((event, index)=> {
    // console.log(props.includeList, event.calendar['WR-CALNAME']);
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
      const dateString = event.details.datetype == 'date' ? event.details.startDate : event.details.start;
      const dateObj = new Date(dateString);
      const dateFinal = `${dateObj.getFullYear().toString()}-${String(dateObj.getMonth()+1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2,'0')}T00:00:00.000`;
      return dateFinal;
    }
  }))).map(item =>{
    return { date: item, events: [] };
  })

  detailedEvents.forEach(event => {
    const dateObj = new Date(event.details.datetype == 'date' ? event.details.startDate : event.details.start);
    const dateFinal = `${dateObj.getFullYear().toString()}-${String(dateObj.getMonth()+1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2,'0')}T00:00:00.000`;
    dateList.forEach(dateItem => {
      if(dateItem.date == dateFinal){
        dateItem.events.push(event);
      }
    })
  })

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
            // console.log(event.details.summary, event.color);
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