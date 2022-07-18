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
      <span onClick={()=>toggleIncludeItem(item)}>
        <FontAwesomeIcon 
          icon={item.included? on : off}
          style={{color: item.color}}
        />
        {`${item.label}`}
      </span>
    </div>
  )
}