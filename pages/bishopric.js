import styles from '../styles/pages.module.scss'
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';

import DocContent from '../components/doc-content';

export default function Bishopric() {
  const nav = navItem("Bishopric")
  return (
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <DocContent docId={process.env.NEXT_PUBLIC_BISHOPRIC_DOC_ID} />
    </div>
  );
}