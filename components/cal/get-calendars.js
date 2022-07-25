import styles from '../../styles/calendars.module.scss';

import { useState, useEffect } from "react";
import ShowCalendars from "./show-calendars";

import manageIncludeList from './manage-include-list';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight as refresh } from '@fortawesome/free-solid-svg-icons';

export default function GetCalendars(props){

  const [ events, setEvents ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const calsToFetch = manageIncludeList.getCalsFetch();

  function getCals(ids){
    setLoading(true);
    fetch(`/api/calendars?calendars=${ids.join(',')}`)
    .then(response => response.json())
    .then(result => {
      console.log(result);
      let eventList = [];
      Object.values(result).forEach( calendar => {
        Object.values(calendar).forEach( calItem => {
          if(calItem.type == "VEVENT"){
            const calStart = new Date(calItem.start);
            const now = Date.now();
            const weekAgo = new Date(now.valueOf()- 604800000);
            const threeMonthsFromNow = new Date(now.valueOf() + 7890000000);
            // only get events 1 week in the past
            if(calStart >= weekAgo){
              //only get events 3 months in the future
              if(calStart <= threeMonthsFromNow){
                eventList.push({calendar: calendar.vcalendar, details: calItem, id: ''})
              }
            }
          }
        })
      })
      let sortedEventList = eventList.sort((a,b)=> {
        return new Date(a.details.start).valueOf() > new Date(b.details.start).valueOf() ? 1 : -1;
      })
      setEvents(sortedEventList);
    })
    .then(setLoading(false))
    .catch(e => console.log('error', e));
  }

  useEffect(() => {
    getCals(calsToFetch);
  },[])

  return(
    <div className={styles["calendar-container"]}>
      <div className={styles['refresh-icon']} onClick={()=> getCals(calsToFetch)}>
        Click to refresh
        <FontAwesomeIcon 
          icon={refresh}
          alt='refresh'
        />
      </div>
      {loading? <div>loading calendars...</div>:
      <ShowCalendars events={events} includeList={props.includeList} setModal={props.setModal}/>}
    </div>
  )

}

//datetype: 'date':'date-time'
//start: '[YYYY]-[MM]-[DD]T[HH]:[MM]:[ss].[SSS]Z'
//end: '[YYYY]-[MM]-[DD]T[HH]:[MM]:[ss].[SSS]Z'
//summary: string
//details: string
//location: string

// datetype  | start & end    | Event type
// ----------|----------------|---------------
// date      | same day       | all day event
// date      | different days | multi-day event
// date-time | same day       | regular event
// date-time | different days | multi-day event