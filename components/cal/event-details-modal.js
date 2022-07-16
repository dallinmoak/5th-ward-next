import styles from '../../styles/calendars.module.scss';
import {useRef } from 'react';
import ReactDom from 'react-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleXmark as close } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark as close } from "@fortawesome/free-regular-svg-icons";

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
          <div className={styles['modal-header']}>
            <div>{props.summary}</div>
            <div onClick={()=>props.setShowModal(false)} className={styles['modal-close']}>
              <FontAwesomeIcon 
                icon={close}
                alt='close'
              />
            </div>
          </div>
          {props.description?
            <div>{props.description}</div> :
            null
          }
          {props.location? 
            <div>{props.location}</div>:
            null
          }
        </div>
      </div>
    </div>,
    document.getElementById('layout')
  )
}