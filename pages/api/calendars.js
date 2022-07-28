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

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const requestedCals = req.query.calendars.split(',');
  if( requestedCals) {
    requestedCals.forEach( cal => {
      console.log(`https://calendar.google.com/calendar/ical/${cal}/public/basic.ics`)
    })
    getCalendars(requestedCals)
    .then(calendars => {
      res.status(200).json({calendars: calendars, tz: tz});
    })
    .catch(error => {
      console.log('failed request: ', requestedCals);
      res.status(500).json({ error })
    })
  } else {
    console.log('no cal request: ', requestedCals);
    res.status(400).json({ error: "no calendars" })
  }
}

// Youth: ep5thwardyouth%40gmail.com

// Young Women: 54ak8d4d51nm0hk44u3e3f501c%40group.calendar.google.com