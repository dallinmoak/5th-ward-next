export const calList = [
  { name: 'youth', id: 'ZXA1dGh3YXJkeW91dGhAZ21haWwuY29t', label: 'Youth', color: '00c9c9', types: ['all','ym','yw']},
  { name: 'youngWomen', id: 'NTRhazhkNGQ1MW5tMGhrNDR1M2UzZjUwMWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', label: 'Young Women', color: '550066', types: ['all', 'yw']},
  { name: 'yw14_18', id: 'NzUyNTR0MDNzN2hnanZncThlb3RwamZjaDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', label: 'YW 14-18', color: '8600b3', types: ['all', 'yw']},
  { name: 'yw12_13', id: 'aTRjbWQwbmc2ZDBiMWlkYXFqMDNtYzNvZm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', label: 'YW 12-13', color: 'cc66ff', types: ['all', 'yw']},
  { name: 'youngMen', id: 'b3Bsamc2YXE3MXM0dXE5ZGtvdXZvb3M2NTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', label: 'Young Men', color: '080066', types: ['all', 'ym']},
  { name: 'preists', id: 'aDNiYXQ0ZzRzbDFxMTJjam04MmhqczNuNzRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', label: 'Preists', color: '0000b3', types: ['all', 'ym']},
  { name: 'teachers', id: 'dnF1OTlhdHVuYTE5NjFqMG1vNWZhdjg3cWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', label: 'Teachers', color: '3344ff', types: ['all', 'ym']},
  { name: 'deacons', id: 'aTV2ZG9yMmJhbWJvcmZuNWlrY3VwYXQ2bWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', label: 'Deacons', color: '6680ff', types: ['all', 'ym']},
];

export function calbyLabel(label){
  let outCal = {message: 'calendar not found'};
  calList.forEach(item => {
    if(item.label == label){outCal = item}
  })
  return outCal;
}

export function getCalIds(calNames) {
  let ids = [];
  calNames.forEach(name => {
    calList.forEach( listItem => {
      if ( listItem.name == name){
        ids.push(listItem.id);
      }
    })
  })
  return ids;
}

export function calendarUrl(type){
  let calendarTitle = 'Calendar';
  switch (type) {
    case 'all':
      calendarTitle = "Youth Calendar";
      break;
    case 'yw':
      calendarTitle = "Young Women Caldendar";
      break;
    case 'ym':
      calendarTitle = 'Young Men Calendar';
      break;
  }
  
  let calPre = `https://calendar.google.com/calendar/embed?wkst=1&ctz=America%2FDenver&title=${encodeURIComponent(calendarTitle)}&bgcolor=%23ffffff&showPrint=0&mode=AGENDA`
  return calPre.concat(
    calList.map(cal =>{
      if(cal.types){
        if(cal.types.includes(type)){
          return "&src=" + cal.id;
        }
      }
    }).join(''),
    calList.map( cal => {
      if(cal.types){
        if(cal.types.includes(type)){
          return '&color=%23' + cal.color
        }
      }
    }).join('')
  );
}