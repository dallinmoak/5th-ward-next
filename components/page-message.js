import styles from '../styles/pages.module.scss';
import Image from 'next/image';

export default function PageMessage(props) {
  return(
    <div className={styles['message-list']}>
      {props.messages.map((message, index) => {
        let messageItemStyles = styles["message-item"];
        console.log("message.styles", message.styles);
        if(message.styles) {
          console.log("new styles", message.styles.map(style =>{
            return styles[style];
          }).join(' '))
          messageItemStyles = messageItemStyles.concat(' ', message.styles.map(style =>{
            return styles[style];
          }).join(' '));
        }
        console.log("messageItemStyles", messageItemStyles);
        return (
          <div className={messageItemStyles} key={index}>
            {message.image? <div className={styles['img-container']}>
              <Image src={message.image} alt={`${message.header}_img`}/>
            </div>: null}
            <div className={styles['message-text']}>
              {message.header?<h3>{message.header}</h3>: null}
              {message.content? message.content.map((contentItem, i) => {
                return(<li key={i}>{contentItem}</li>);
              }): null}
            </div>
          </div>
        )
      })}
    </div>
  );
}