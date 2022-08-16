import { memo } from 'react'

import styles from './Empty.module.css'

export default memo(function Empty() {
  return <div className={styles.container}>There is nothing here</div>
})
