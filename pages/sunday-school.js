import styles from '../styles/pages.module.scss'
import SundaySchoolWidget from '../components/sunday-school-widget';

export default function SundaySchool() {
  return(
    <div className={styles['container']}>
      <h1 className={styles['bottom-margin']}>Sunday School</h1>
      <h2>Sunday Lesson:</h2>
      <SundaySchoolWidget type="Sunday School"></SundaySchoolWidget>
    </div>
  );
}