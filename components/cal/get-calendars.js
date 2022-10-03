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
    const lookBack = 1000 * 60 * 60 * 24 * 7;
    const lookForward = 1000 * 60 * 60 * 24 * 30 * 3;
    fetch(`/api/calendars?calendars=${ids.join(',')}&lb=${lookBack}&lf=${lookForward}`)
    .then(response => response.json())
    .then(result => {
      setEvents(result.eventList);
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