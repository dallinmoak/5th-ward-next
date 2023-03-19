import styles from '../styles/pages.module.scss'
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';
import SundaySchoolWidget from '../components/sunday-school-widget';
import DocContent from '../components/doc-content';

export default function SundaySchool() {
  const nav = navItem("Sunday School")
  return(
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <DocContent docId={process.env.NEXT_PUBLIC_SUNDAY_SCHOOL_DOC_ID} />
      <h2>Sunday Lesson:</h2>
      <SundaySchoolWidget type="Sunday School" />
    </div>
  );
}