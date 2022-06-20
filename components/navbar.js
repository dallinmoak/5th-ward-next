import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/nav.module.scss';
import navList from '../common/nav-list';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function navbar(){

  const [collapseState, setCollapseButton ] = useState('collapsed');


  function toggleCollapse(){
    setCollapseButton( collapseState=='collapsed' ? 'expanded': 'collapsed');
  }

  return(
    <nav className={styles['main-nav']}>
      <div className={styles['nav-inner']}>
        <div className={styles['nav-title-wrapper']}>
          <div className={styles['nav-title']}>
            <h1 onClick={()=> setCollapseButton('collapsed')}>
              <Link href="/">
                <a>El Paso 5th Ward</a>
              </Link>
            </h1>
          </div>
          <FontAwesomeIcon
            icon={collapseState == 'collapsed' ? faBars : faXmark}
            className={styles['font-icon'] + " " + styles[collapseState]}
            onClick={() => toggleCollapse()}
          />
        </div>
        <div className={styles['nav-list-container']}>
          <ul className={styles['nav-items'] + " " + styles[collapseState]}>
            {navList.map((navItem, index) => {
              return (
                <li key={index} onClick={() => toggleCollapse()}>
                  <Link href={navItem.route}>
                    <a className={styles['nav-link']}>{navItem.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
