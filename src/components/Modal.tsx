import { SyntheticEvent } from 'react'
import { createPortal } from 'react-dom'

import styles from './Modal.module.css'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose(): void
}

export default function Modal(p: Props) {
  if(!p.isOpen) {
    return null
  }

  const stopPropagation = (e: SyntheticEvent<HTMLElement>) => {
    e.stopPropagation()
  }

  return createPortal(
    <div className={styles.overlay} onClick={p.onClose}>
      <div className={styles.container} onClick={stopPropagation}>
        {p.children}
      </div>
    </div>
    ,
    document.querySelector('body') as HTMLBodyElement
  )
}
