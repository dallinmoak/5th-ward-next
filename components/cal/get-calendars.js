import styles from '../../styles/calendars.module.scss';

import { useState, useEffect } from "react";
import { calList, calbyLabel } from "../../common/calendar";
import ShowCalendars from "./show-calendars";

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

  function showIncludeItem(item, index){
    return(<div key={index}>
      {`${item.label}: ${item.included}`}<button onClick={()=>toggleIncludeItem(item)}>toggle</button>
    </div>);
  }

  useEffect(() => {
    setIncludeList(calList.map(cal =>{
      const b64Id = cal.id;
      const id = Buffer.from(b64Id?b64Id:'', 'base64').toString('ascii')
      return {
        label: cal.label,
        included: true,
        id: id
      }
    }))
    getCals(calsToInclude);
  },[])
  useEffect(() =>{console.log('updated include List')},[includeList])

  return(
    <div className={styles["calendar-container"]}>
      {includeList.map((item, index) => {return showIncludeItem(item, index)} )}
      {<button onClick={()=> getCals(calsToInclude)}>refresh calendars</button>}
      <ShowCalendars events={events} includeList={includeList} sendIncludeList={sendIncludeList}/>
    </div>
  )

}