import styles from '../styles/pages.module.scss'

export default function SundaySchoolWidget(props) {

  const widgetType = props.type.replace(/[!'()*]/g, (c) => {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });

  const widgetUrl = `https://sunday-school-next.vercel.app/?type=${widgetType}`

  return (
    <iframe className={styles['ss-widget']} src={widgetUrl}></iframe>
  );
}