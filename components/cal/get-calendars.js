import styles from '../../styles/calendars.module.scss';

import { useState, useEffect } from "react";
import { calList, calbyLabel } from "../../common/calendar";
import ShowCalendars from "./show-calendars";
import ItemList from './item-list';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight as refresh } from '@fortawesome/free-solid-svg-icons';

export default function GetCalendars(){

  const [ events, setEvents ] = useState([]);
  const [ includeList, setIncludeList ] = useState([]);

  const calsToInclude = calList
  .map(cal => {
    const b64Id = cal.id;
    return Buffer.from(b64Id?b64Id:'', 'base64').toString('ascii')
  })

  function getCals(ids){
    fetch(`/api/calendars?calendars=${ids.join(',')}`)
    .then(response => response.json())
    .then(result => {
      let eventList = [];
      Object.values(result).forEach( calendar => {
        Object.values(calendar).forEach( calItem => {
          if(calItem.type == "VEVENT"){
            eventList.push({calendar: calendar.vcalendar, details: calItem, id: ''})
          }
        })
      })
      let sortedEventList = eventList.sort((a,b)=> {
        return new Date(a.details.start).valueOf() > new Date(b.details.start).valueOf() ? 1 : -1;
      })
      setEvents(sortedEventList);
    })
    .catch(e => console.log('error', e));
  }

  function sendIncludeList(){
    return includeList;
  }

  function toggleIncludeItem(toggleItem){
    let newItemList = includeList.map(item => {
      if(item.label == toggleItem.label){
        item.included = !item.included;
      }
      return item;
    })
    setIncludeList(newItemList);
    sendIncludeList();
  }

  useEffect(() => {
    setIncludeList(calList.map(cal =>{
      const b64Id = cal.id;
      const id = Buffer.from(b64Id?b64Id:'', 'base64').toString('ascii')
      return {
        label: cal.label,
        included: true,
        id: id,
        color: cal.color
      }
    }))
    getCals(calsToInclude);
  },[])
  useEffect(() =>{},[includeList])

  return(
    <div className={styles["calendar-container"]}>
      <div className={styles['cal-top-items']}>
        <div className={styles['include-list-wrapper']}>
          <ItemList includeList={includeList} toggleIncludeItem={toggleIncludeItem}/>
        </div>
        <div className={styles['refresh-icon']} onClick={()=> getCals(calsToInclude)}>
          <FontAwesomeIcon icon={refresh}/>
        </div>
      </div>
      <ShowCalendars events={events} includeList={includeList} sendIncludeList={sendIncludeList}/>
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