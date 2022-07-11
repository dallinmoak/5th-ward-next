import { useEffect } from 'react';

export default function ShowCalendars(props) {
  useEffect(()=> {},[props.includeList])

  return(
    <div>
      <table style={{border: "1px solid black"}}>
        <thead>
          <tr style={{border: "1px solid black"}}>
            <th style={{border: "1px solid black"}}>Calendar</th>
            <th style={{border: "1px solid black"}}>Date</th>
            <th style={{border: "1px solid black"}}>Summary</th>
            <th style={{border: "1px solid black"}}>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.events.map( (event, index) => {
            let included = false;
            props.includeList.forEach(includeItem => {
              if(includeItem.label == event.calendar['WR-CALNAME']){
                included = includeItem.included
              }
            })
            
            return(
              included ?
              <tr key={index} style={{border: "1px solid black"}}>
                <td style={{border: "1px solid black"}}>{event.calendar['WR-CALNAME']}</td>
                <td style={{border: "1px solid black"}}>{new Intl.DateTimeFormat('en-us', { month: 'short', day: '2-digit', year: 'numeric'}).format(new Date(event.details.start))}</td>
                <td style={{border: "1px solid black"}}>{event.details.summary}</td>
                <td style={{border: "1px solid black"}}>{event.details.description}</td>
              </tr> :
              null
            )
          })}
        </tbody>
      </table>
    </div>
  )
}