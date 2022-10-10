import styles from '../styles/pages.module.scss'
import navItem from '../common/nav-item';
import PageHead from '../components/page-head';

export default function Missionaries() {
  const nav = navItem("Missionaries")
  return (
    <div className={styles['container']}>
      <PageHead nav={nav}/>
      <h1>{nav.name}</h1>
      <p>click <a className={styles['message-link']} href='https://docs.google.com/spreadsheets/d/1foGFyfCL9TykGL2s0ISRaaQ9siVpIXU1XZ0K2Nn4jGI/edit' rel='noreferrer noopener' target='_blank'>here</a> to sign up to attend lessons with the missionaries</p>
    </div>
  );
}