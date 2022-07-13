import { useEffect } from 'react';

export default function ShowCalendars(props) {
  useEffect(()=> {},[props.includeList])

  let detailedEvents = props.events.map((event, index)=> {
    let includedItem = props.includeList.find(item => item.label == event.calendar['WR-CALNAME']);
    if(includedItem.included){
      event.color = includedItem.color;
      event.index = index;
      return (event);
    }
  }).filter(e => e !== undefined);

  let dateList = Array.from(new Set(detailedEvents.map(event => {
    if (event.details.start){
      return event.details.start.substring(0,10)
    }
  }))).map(item =>{
    return { date: item, events: [] };
  })
  

  detailedEvents.forEach(event => {
    let targetDate = event.details.start.substring(0,10);
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
    let timeformat = {hour: 'numeric', minute: 'numeric', hour12: true }
    let startTime = new Intl.DateTimeFormat('en-us', timeformat).format(new Date(event.details.start));
    let allDay = event.details.datetype == 'date' ? true: false;
    return(
      <div key={index} style={{ backgroundColor: `#${event.color}`, color: "#fff"}}>
        {allDay ? 'All day' : startTime}----{summary}{description? "-"+description:''}{location? "@ "+location:''}------{calendar}
      </div>
    )
  }

  function printDate(date, index){
    let currentDate = new Date(date.date);
    let format = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'}
    let dateFormatted = new Intl.DateTimeFormat('en-us', format).format(currentDate);
    return(
      <div key={index}>
        <div>{dateFormatted}</div>
        {date.events.map((event, index) =>{
          return printEvent(event, index);
        })}
      </div>
    )
  }

  function printAllDates(){
    if(dateList.length>0){
      return dateList.map((date, index) => {
        return printDate(date,index);
      });
    } else {
      return "no events to show";
    }
  }

  return(
    <div>
      {printAllDates()}
    </div>
  )
}