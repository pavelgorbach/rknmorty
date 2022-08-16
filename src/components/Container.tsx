import { memo } from 'react'

import styles from './Container.module.css'

export default memo(function Container(p: { children: React.ReactNode}) {
  return <div className={styles.container}>{p.children}</div>
})
