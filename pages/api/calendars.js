import ical from 'node-ical';

export default function handler(req, res) { 

  async function getCalendar(calId){
    return await ical.async.fromURL(`https://calendar.google.com/calendar/ical/${calId}/public/basic.ics`)
  }

  async function getCalAsync(calId){
    return getCalendar(calId);
  }

  async function getCalendars(calIds){
    console.log('CalIds:', calIds)
    return Promise.all(calIds.map(calId => getCalAsync(calId)));
  }
  const requestedCals = req.query.calendars.split(',');
  if( requestedCals) {
    getCalendars(requestedCals)
    .then(calendars => {
      console.log('sucessful request for: ', requestedCals);
      console.log('calendars to be added to the response:')
      calendars.forEach(calendar => {
        console.log(`${calendar.vcalendar['WR-CALNAME']} - ${calendar.vcalendar.prodid}`);
      })
      res.status(200).send({ calendars });
    })
    .catch(error => {
      console.log('failed request: ', requestedCals);
      res.status(500).send({ error })
    })
  } else {
    console.log('no cal request: ', requestedCals);
    res.status(400).send({ error: "no calendars" })
  }
}

// Youth: ep5thwardyouth%40gmail.com

// Young Women: 54ak8d4d51nm0hk44u3e3f501c%40group.calendar.google.com