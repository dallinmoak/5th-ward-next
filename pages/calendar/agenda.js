import styles from '../../styles/pages.module.scss'
import navItem from '../../common/nav-item';
import PageHead from '../../components/page-head';

import GetCalendars from '../../components/cal/get-calendars';

export default function Agenda(props) {
  const nav = navItem("Ward Calendar")

  const calNames = ['Youth','Deacons','Teachers','Preists','YW 12-13','YW 14-18','Young Men','Young Women'];

  return (
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <GetCalendars calNames={calNames} includeList={props.includeList} setModal={props.setModal}/>
    </div>
  );
}