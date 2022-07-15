import styles from '../../styles/calendars.module.scss';
import ItemToggler from './item-toggler';
import manageIncludeList from './manage-include-list';

import { useState } from 'react';

import { faChevronDown as expand, faChevronUp as collapse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ItemList(props) {

  const [ collapsed, setCollapsed ] = useState(true);

  function toggleIncludeItem(item){
    props.updateIncludeList(
      manageIncludeList.toggleIncludeList(props.includeList,item)
    );
  }

  return(
    <div className={styles['cal-top-items']}>
      <div className={styles['include-list-wrapper']}>
        <div className={styles['include-list-container'] + " " + styles[collapsed? 'collapsed':'expanded']}>
          <h3 onClick={()=> setCollapsed(!collapsed)}>
            Calendars to show <FontAwesomeIcon icon={collapsed ? expand : collapse }/>
          </h3>
          <div className={styles['include-list']}>
            {props.includeList.map((item, index) => { 
              return(<ItemToggler
                key={index}
                toggleItem={item}
                toggler={toggleIncludeItem}
              />)
            })}
          </div>
        </div>
      </div>
    </div>
  )
}