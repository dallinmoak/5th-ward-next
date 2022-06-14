import styles from '../styles/pages.module.scss'

export default function EldersQuorum() {
  return(
    <div className={styles['container']}>
      <h1 className={styles['bottom-margin']}>Elder&apos;s Quorum Page</h1>
      <h2>Sunday Lesson:</h2>
      <iframe className={styles['ss-widget']} src="https://sunday-school-next.vercel.app/?type=Elder%27s%20Quorum"></iframe>
    </div>
  );
}