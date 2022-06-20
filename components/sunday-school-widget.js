import styles from '../styles/pages.module.scss'
import colors from '../styles/exports.module.scss'
import Refresh from './refresh';

import {useState} from 'react';

export default function SundaySchoolWidget(props) {

  const [ refresh, setRefresh ] = useState(0);

  const widgetType = props.type.replace(/[!'()*]/g, (c) => {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
  });
  const widgetUrl = `https://sunday-school-next.vercel.app/?type=${widgetType}`

  return (
    <div className={styles['widget-container']}>
      <iframe key={refresh} className={styles['ss-widget']} src={widgetUrl}/>
      <div onClick={()=>{setRefresh(prevRefresh => prevRefresh + 1)}}>
        <Refresh className={styles['refresh'] } fillColor={colors.midGray} />
      </div>
    </div>
  );
}
