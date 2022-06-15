import styles from '../styles/pages.module.scss'
import SundaySchoolWidget from '../components/sunday-school-widget';

export default function ReliefSociety() {
  return(
    <div className={styles['container']}>
      <h1 className={styles['bottom-margin']}>Relief Society</h1>
      <h2>Sunday Lesson:</h2>
      <SundaySchoolWidget type="Relief Society"></SundaySchoolWidget>
    </div>
  );
}