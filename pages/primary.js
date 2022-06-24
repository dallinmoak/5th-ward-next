import styles from '../styles/pages.module.scss';
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';

export default function Primary() {
  const nav = navItem("Primary")
  return(
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <h1>{nav.name}</h1>
    </div>
  );
}