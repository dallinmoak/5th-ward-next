import styles from '../styles/pages.module.scss'
import SundaySchoolWidget from '../components/sunday-school-widget';

export default function EldersQuorum() {
  return(
    <div className={styles['container']}>
      <h1 className={styles['bottom-margin']}>Elder&apos;s Quorum Page</h1>
      <h2>Sunday Lesson:</h2>
      <SundaySchoolWidget type="Elder's Quorum"></SundaySchoolWidget>
    </div>
  );
}