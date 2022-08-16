import { memo } from 'react'
import styles from './Loader.module.css'

export default memo(function Loader() {
  return <div className={styles.container}><div></div><div></div><div></div></div>
})