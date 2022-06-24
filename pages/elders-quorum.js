import styles from '../styles/pages.module.scss'
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';
import SundaySchoolWidget from '../components/sunday-school-widget';

export default function EldersQuorum() {
  const nav = navItem("Elder's Quorum")
  return(
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <h1 className={styles['bottom-margin']}>{nav.name}</h1>
      <h2>Sunday Lesson:</h2>
      <SundaySchoolWidget type="Elder's Quorum"></SundaySchoolWidget>
    </div>
  );
}