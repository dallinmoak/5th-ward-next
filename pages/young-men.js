import styles from '../styles/pages.module.scss';
import Link from 'next/link';
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';

import DocContent from '../components/doc-content';

export default function YoungMen() {
  const nav = navItem('Young Men');
  return(
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <DocContent docId={process.env.NEXT_PUBLIC_YOUNG_MEN_DOC_ID} />
      <p className={styles['message-link-container']}>
        View the young men calendar <Link href={navItem("Calendar").route}>here</Link>!
      </p>
    </div>
  );
}