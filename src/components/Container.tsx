import { memo } from 'react'

import styles from './Container.module.scss'

export default memo(function Container(p: { children: React.ReactNode}) {
  return <div className={[styles.container, styles.normalize].join(' ')}>{p.children}</div>
})
