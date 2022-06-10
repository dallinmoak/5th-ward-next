import Link from 'next/link';

import styles from '../styles/notfound.module.scss';

export default function Custom404() {
  return (
    <div className={styles['message']}>
      <h1>404 - Page Not Found
        <span className={styles['message-inner']}>
          Try visiting the <Link href='/'><a className={styles['link']}>home</a></Link> page.
        </span>
      </h1>
    </div>
  );
}