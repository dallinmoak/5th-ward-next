import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function navbar(){

  const [collapseState, setCollapseButton ] = useState('collapsed');

  const navList = [
    'Home',
    'Elder\'s quorum',
    'Relief Society',
    'Bishopric',
    'Calendar',
    'Young Men',
    'Young Women',
    'Sunday School',
    'Primary'
  ];
  function toggleCollapse(){
    setCollapseButton( collapseState=='collapsed' ? 'expanded': 'collapsed');
  }

  return(
    <nav className="main-nav">
      <div className="nav-inner">
        <div className="nav-title">
          <h1><a>El Paso 5th Ward</a></h1>
        </div>
        <div className="nav-list-container">
          <FontAwesomeIcon
            icon={collapseState == 'collapsed' ? faBars : faXmark}
            className={collapseState}
            onClick={() => toggleCollapse()}
          />
          <ul className={`nav-items ${collapseState}`}>
            {navList.map((navItem, index) => {
              return(
                <li key={index}><a className="nav-link">
                  {navItem}
                </a></li>
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}