

export default function calendarUrl(type){
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
  const calList = [
    { name: 'youth', id: 'ZXA1dGh3YXJkeW91dGhAZ21haWwuY29t', color: '00c9c9', type: ['all','ym','yw']},
    { name: 'deacons', id: 'aTV2ZG9yMmJhbWJvcmZuNWlrY3VwYXQ2bWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', color: '3F51B5', types: ['all', 'ym']},
    { name: 'teachers', id: 'dnF1OTlhdHVuYTE5NjFqMG1vNWZhdjg3cWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', color: '3F51B5', types: ['all', 'ym']},
    { name: 'preists', id: 'aDNiYXQ0ZzRzbDFxMTJjam04MmhqczNuNzRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', color: '3F51B5', types: ['all', 'ym']},
    { name: 'yw12_13', id: 'aTRjbWQwbmc2ZDBiMWlkYXFqMDNtYzNvZm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', color: '0B8043', types: ['all', 'yw']},
    { name: 'yw14_18', id: 'NzUyNTR0MDNzN2hnanZncThlb3RwamZjaDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', color: '0B8043', types: ['all', 'yw']},
    { name: 'youngMen', id: 'b3Bsamc2YXE3MXM0dXE5ZGtvdXZvb3M2NTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', color: '3F51B5', types: ['all', 'ym']},
    { name: 'youngWomen', id: 'NTRhazhkNGQ1MW5tMGhrNDR1M2UzZjUwMWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ', color: '0B8043', types: ['all', 'yw']},
  ];
  
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

// "https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FDenver&src=ZXA1dGh3YXJkeW91dGhAZ21haWwuY29t&src=aTV2ZG9yMmJhbWJvcmZuNWlrY3VwYXQ2bWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=aDNiYXQ0ZzRzbDFxMTJjam04MmhqczNuNzRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=dnF1OTlhdHVuYTE5NjFqMG1vNWZhdjg3cWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=aTRjbWQwbmc2ZDBiMWlkYXFqMDNtYzNvZm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=NzUyNTR0MDNzN2hnanZncThlb3RwamZjaDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=b3Bsamc2YXE3MXM0dXE5ZGtvdXZvb3M2NTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=NTRhazhkNGQ1MW5tMGhrNDR1M2UzZjUwMWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23039BE5&color=%233F51B5&color=%233F51B5&color=%233F51B5&color=%230B8043&color=%230B8043&color=%233F51B5&color=%230B8043"

// "https://calendar.google.com/calendar/embed?wkst=1&ctz=America%2FDenver&title=Youth%20Calendar&bgcolor=%23ffffff&showPrint=0&mode=AGENDA&src=&src=aTV2ZG9yMmJhbWJvcmZuNWlrY3VwYXQ2bWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=dnF1OTlhdHVuYTE5NjFqMG1vNWZhdjg3cWtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=aDNiYXQ0ZzRzbDFxMTJjam04MmhqczNuNzRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=aTRjbWQwbmc2ZDBiMWlkYXFqMDNtYzNvZm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=NzUyNTR0MDNzN2hnanZncThlb3RwamZjaDRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=b3Bsamc2YXE3MXM0dXE5ZGtvdXZvb3M2NTRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&src=NTRhazhkNGQ1MW5tMGhrNDR1M2UzZjUwMWNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23&color=%233F51B5&color=%233F51B5&color=%233F51B5&color=%230B8043&color=%230B8043&color=%233F51B5&color=%230B8043"
