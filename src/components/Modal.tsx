import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

type Props = {
  children: React.ReactNode
  isOpen: boolean
  onClose(): void
}

function Modal({ children, isOpen, onClose }: Props) {
  if(!isOpen) {
    return null
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
    ,
    document.querySelector('body') as HTMLBodyElement
  )
}

export default Modal