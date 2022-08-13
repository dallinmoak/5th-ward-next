import styles from '../styles/pages.module.scss'
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';

import GetCalendars from '../components/cal/get-calendars';

export default function Calendar(props) {
  const nav = navItem("Calendar")

  return (
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <p className={[styles['bottom-margin'],styles['message-link-container']].join(' ')}>
        The official ward calendar is available at <a href="https://www.churchofjesuschrist.org/calendar" target="_blank" rel="noreferrer">churchofjesuschrist.org</a>.
      </p>
      <GetCalendars includeList={props.includeList} setModal={props.setModal}/>
    </div>
  );
}