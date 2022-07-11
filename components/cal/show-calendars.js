import { useEffect } from 'react';

export default function ShowCalendars(props) {
  useEffect(()=> {},[props.includeList])

  return(
    <div>
      <table>
        <thead>
          <tr>
            <th>Calendar</th>
            <th>Date</th>
            <th>Summary</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {props.events.map( (event, index) => {
            let included = false;
            let color = '000000';
            props.includeList.forEach(includeItem => {
              if(includeItem.label == event.calendar['WR-CALNAME']){
                included = includeItem.included;
                color = includeItem.color;
              }
            })
            
            return(
              included ?
              <tr key={index} style={{ backgroundColor: `#${color}`, color: "#fff"}}>
                <td>{event.calendar['WR-CALNAME']}</td>
                <td>{new Intl.DateTimeFormat('en-us', { month: 'short', day: '2-digit', year: 'numeric'}).format(new Date(event.details.start))}</td>
                <td>{event.details.summary}</td>
                <td>{event.details.description}</td>
              </tr> :
              null
            )
          })}
        </tbody>
      </table>
    </div>
  )
}