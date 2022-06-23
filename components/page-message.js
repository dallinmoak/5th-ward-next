import styles from '../styles/pages.module.scss';
import Image from 'next/image';

export default function PageMessage(props) {
  return(
    <div>
      {props.messages.map((message, index) => {
        return (
          <div className={styles['message-item']}key={index}>
            <div className={styles['img-container']}>
              {message.image? <Image src={message.image} alt={`${message.header}_img`}/>: null}
            </div>
            <div className={styles['message-text']}>
              {message.header?<h3>{message.header}</h3>: null}
              {message.content?<p>{message.content}</p>: null}
            </div>
          </div>
        )
      })}
    </div>
  );
}