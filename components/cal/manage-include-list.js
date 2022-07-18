import { calList } from '../../common/calendar';

const getCalsFetch = () => {
  return (
    calList.map(cal => {
      const b64Id = cal.id;
      return Buffer.from(b64Id?b64Id:'', 'base64').toString('ascii')
    })
  )
}

const initialIncludeList = () => {
  return(
   calList.map( cal => {
    const b64Id = cal.id;
    const id = Buffer.from(b64Id?b64Id:'','base64'.toString('ascii'))
    return {
      label: cal.label,
      included: true,
      id: id,
      color: cal.color,
    }
   }) 
  )
}

const toggleIncludeList = (list, toggleItem) => {
  let newItemList = list.map(item => {
    if(item.label == toggleItem.label){
      item.included = !item.included;
    }
    return item;
  })
  return(newItemList);
}

const myFunction = () => { 
  console.log('my function ran');
};

const manageIncludeList = {
  myFunction: myFunction,
  getCalsFetch: getCalsFetch,
  initialIncludeList: initialIncludeList,
  toggleIncludeList: toggleIncludeList,
};

export default manageIncludeList;