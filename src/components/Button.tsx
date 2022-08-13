import styles from './Button.module.css'

type Props = {
  children: string
  onClick(): void
}

function Button({ children, onClick }: Props) {
  return <button className={styles.container} onClick={onClick}>{children}</button>
}

export default Button