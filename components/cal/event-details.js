import styles from '../../styles/calendars.module.scss';

import { useState } from 'react';
import EventDetailsModal from './event-details-modal';

export default function EventDetails(props){

  const [ showModal, setShowModal ] = useState(false);
  function setModal(val){
    setShowModal(val);
    props.setModal(val);
  }

  let summary = props.event.details.summary;
  let description = props.event.details.description;
  let location = props.event.details.location;
  let calendar = props.event.calendar['WR-CALNAME'];
  let calShort = calendar;
  if(calendar == "Young Women"){
    calShort = "YW";
  }
  if(calendar == "Young Men"){
    calShort = "YM";
  }
  let timeformat = {hour: 'numeric', minute: 'numeric', hour12: true }
  let start = new Date(props.event.details.start);
  let end = new Date(props.event.details.end);
  let startTime = new Intl.DateTimeFormat('en-us', timeformat).format(start);
  let allDay = props.event.details.datetype == 'date' ? true: false;
  let color = props.event.color;
  return(
    <div key={props.index}>
      <div style={{ backgroundColor: `#${color}`, color: "#fff"}} className={styles['event-item']} onClick={()=>{setModal(true)}}>
        <div>{allDay ? 'All day' : startTime}</div>
        <div>
          <div className={styles['event-summary']}>{summary}</div>
          <div className={styles['event-description']}>click or tap for details</div>
        </div>
        <div className={styles['event-calendar']}>{calShort}</div>
      </div>
      {showModal? <EventDetailsModal
        setShowModal={setModal}
        color={color}
        summary={summary}
        description={description}
        location={location}
        allDay={allDay}
        start={start}
        end={end}
        calendar={calendar}
      /> : null}
    </div>
  )
}