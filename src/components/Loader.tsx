import { memo } from 'react'
import styles from './Loader.module.scss'

export default memo(function Loader() {
  return <div className={styles.container}><div></div><div></div><div></div></div>
})