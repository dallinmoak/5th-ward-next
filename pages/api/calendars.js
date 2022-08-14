import ical from 'node-ical';

export default function handler(req, res) { 
  async function getCalendar(calId){
    return await ical.async.fromURL(`https://calendar.google.com/calendar/ical/${calId}/public/basic.ics`)
  }

  async function getCalAsync(calId){
    return getCalendar(calId);
  }

  async function getCalendars(calIds){
    return Promise.all(calIds.map(calId => getCalAsync(calId)));
  }

  function addAllDayDates(calendars){
    calendars.forEach(calendar => {
      Object.values(calendar).forEach(event => {
        if ( event.type == 'VEVENT'){
          if ( event.datetype == 'date'){
            const dateFormat = date => {
              return ([
                date.getFullYear().toString(),
                String(date.getMonth()+1).padStart(2, '0'), 
                String(date.getDate()).padStart(2, '0')
              ].join('-') + 'T00:00:00')
            }
            event.startDate = dateFormat(new Date(event.start));
            event.endDate = dateFormat(new Date(event.end));
          }
        }
      })
    })
    return calendars;
  }

  const calendarAliases = [{target: "Elders Quorum", value: "Elder's Quorum"}]

  function setCalendarAliases(calendars){
    return calendars.map(calendar => {
      Object.values(calendar).forEach(item => {
        if (item.type == "VCALENDAR"){
          calendarAliases.forEach(alias =>{
            if (item['WR-CALNAME'] == alias.target){
              item['WR-CALNAME'] = alias.value;
            }
          })
        }
      })
      return calendar;
    })
  }

  function dateFilter(calendars,lb,lf){
    return calendars.map(calendar => {
      let newCalendar = {};
      Object.values(calendar).forEach(item => {
        if(item.type == 'VEVENT'){
          const calStart = new Date(item.start).valueOf();
          if ((calStart >= lb) && (calStart <= lf)){
            newCalendar[item.uid] = item;
          }
        } else {
          newCalendar.vcalendar = item;
        }
      })
      return newCalendar;
    })
  }

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const requestedCals = req.query.calendars.split(',');
  const now = Date.now();
  const lookBack = new Date(now.valueOf() - parseFloat(req.query.lb));
  const lookForward = new Date(now.valueOf()  + parseFloat(req.query.lf));
  if( requestedCals) {
    getCalendars(requestedCals)
    .then(calendars => {
      calendars = addAllDayDates(calendars);
      calendars = setCalendarAliases(calendars);
      calendars = dateFilter(calendars, lookBack, lookForward);
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
