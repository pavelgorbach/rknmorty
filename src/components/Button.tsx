import { memo } from 'react'

import styles from './Button.module.css'

type Props = {
  children: string
  disabled?: boolean
  onClick(): void
}

export default memo(function Button({ children, disabled, onClick }: Props) {
  return <button className={styles.container} disabled={disabled} onClick={onClick}>{children}</button>
})
