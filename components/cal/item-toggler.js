import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare as off, faSquareCheck as on } from '@fortawesome/free-solid-svg-icons';

import styles from '../../styles/calendars.module.scss';

export default function ItemToggler(props){
  let item = props.toggleItem;
  function toggleIncludeItem(item){
    props.toggler(item);
  }
  return(
    <div className={styles['calendar-toggler']}>
      {/* <input type="checkbox" onClick={()=>toggleIncludeItem(item)} checked={item.included}/> */}
      <span onClick={()=>toggleIncludeItem(item)}>
        <FontAwesomeIcon 
          icon={item.included? on : off}
          style={{color: item.color}}
        />
        {/* <FontAwesomeIcon icon='fa-solid fa-toogle-off'/> */}
        {`${item.label}`}
      </span>
    </div>
  )
}