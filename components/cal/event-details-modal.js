import styles from '../../styles/calendars.module.scss';
import {useRef } from 'react';
import ReactDom from 'react-dom';

import { FontAwesomeIcon as Fa } from '@fortawesome/react-fontawesome';
import { faCalendar as calIcon } from '@fortawesome/free-regular-svg-icons';
import { faXmark as close, faCircleInfo as info, faLocationDot as loc } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from 'react';

export default function EventDetailsModal(props){

  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      props.setShowModal(false);
    }
  };
  
  const customStyle = {
    backgroundColor: `#${props.color? props.color: '000088'}`, 
    color: "#fff"
  }
  const endMod = props.allDay ? new Date(Date.parse(props.end) - 1000): props.end;
  const dateFormat = { month: 'numeric', year: 'numeric', day: 'numeric', timeZone: 'America/Denver' }
  const startDate = props.start.toLocaleString('en-US', dateFormat);
  const endDate = endMod.toLocaleString('en-US', dateFormat);
  const multiDay = startDate == endDate ? false : true;
  console.log('start',props.start)
  console.log('start raw', props.startRaw)
  console.log('start alt', new Date(props.startRaw))
  console.log('end',props.end)
  console.log('end mod', endMod)  
  console.log('end Raw', props.endRaw)
  console.log('end alt', new Date(props.endRaw))
  console.log('end alt mod', new Date(Date.parse(new Date(props.endRaw)) - 1000))
  function printStartEnd(){
    const dateFormat = { weekday: 'long', month: 'short', day: 'numeric', year: '2-digit'}
    const allFormat = { weekday: 'long', month: 'short', day: 'numeric', year: '2-digit', hour: 'numeric', minute: '2-digit' }
    const timeFormat = { hour: 'numeric', minute: '2-digit'}
    if(props.allDay && multiDay){
      return(`${props.start.toLocaleString('en-US', dateFormat)} - ${endMod.toLocaleString('en-us', dateFormat)}`);
    } else if( props.allDay && !multiDay){
      return(props.start.toLocaleString('en-US', dateFormat) + " All Day");
    } else if (!props.allDay && multiDay){
      return(`${props.start.toLocaleString('en-US', allFormat)} - ${endMod.toLocaleString('en-us', allFormat)}`)
    } else if ( !props.allDay && !multiDay){
      return(`${props.start.toLocaleString('en-US', allFormat)} - ${endMod.toLocaleString('en-us', timeFormat)}`)
    }
  }

  useEffect(() => {
    const keystrokeHandler = event => {
      if (event.key === 'Escape') {
        event.preventDefault();
        props.setShowModal(false)
      }
    };
    document.addEventListener('keydown', keystrokeHandler);
    return () => {
      document.removeEventListener('keydown', keystrokeHandler);
    };
  }, []);

  return ReactDom.createPortal(
    <div
      ref={modalRef}
      onClick={closeModal}
      className={styles['event-modal']}
    >
      <div
        className={styles['event-modal-inner']}
        style={customStyle}
      >
        <div className={styles['modal-content']}>
          <div className={styles['upper-modal']}>
            <div className={styles['modal-content-inner']}>
              <div className={styles['modal-header']}>
                <div>{props.summary}</div>
              </div>
              <div className={styles['modal-startend']}>{printStartEnd()}</div>
              {props.description? <div className={styles['modal-icon-basic']}><Fa icon={info}/>{props.description}</div> : null}
              {props.location? <div className={styles['modal-icon-basic']}><Fa icon={loc}/>{props.location}</div>: null}
            </div>
            <div onClick={()=>props.setShowModal(false)} className={styles['modal-close']}>
              <Fa icon={close} alt='close'/>
            </div>
          </div>
          <div className={styles['modal-calname']}>
            <Fa icon={calIcon}/>{props.calendar}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('layout')
  )
}