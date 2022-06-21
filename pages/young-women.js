import navItem from '../common/nav-item';
import styles from '../styles/pages.module.scss';
import PageHead from '../components/page-head';
import calendarUrl from '../common/calendar';
import Image from 'next/image';
import bom60 from '../public/bom60.png';

export default function YoungWomen() {
  const nav = navItem('Young Women');
  const messages = [
    {header: "Book of Mormon in 60 Days",content:"The youth of our ward would like to invite you to join in on their Book of Mormon 60 day challenge for June and July! Many of them also committed to taking a book of Mormon, writing their testimony in it and giving it to a friend to join them in this challenge. They want to extend this invitation to you as well! The sister missionaries have a whole box of Book of Mormons! Lets all do out part to gather Israel!", image: bom60}
  ]
  return(
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <h1>{nav.name} </h1>
      {messages.map((message, index) => {
        return (
          <div key={index}>
            {message.image? <Image src={message.image} layout="raw"/>: null}
            {message.header?<h3>{message.header}</h3>: null}
            {message.content?<p>{message.content}</p>: null}
          </div>
        )
      })}
      <iframe src={calendarUrl}></iframe>
    </div>
  );
}