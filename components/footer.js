import styles from '../styles/footer.module.scss'

export default function footer(){
  return(
    <footer className={styles['main-footer']}>
      <div className={styles['footer-content']}>
        This site is an unofficial ward resource and is not endorsed by or a product of <a href="https://www.churchofjesuschrist.org" target="_blank" rel="noreferrer">The Church of Jesus Christ of Latter Day Saints</a>
      </div>
    </footer>
  )
}