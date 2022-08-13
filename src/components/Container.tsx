import styles from './Container.module.css'

type Props = {
  children: React.ReactNode 
}

function Container({ children }: Props) {
  console.log('Container')
  return <div className={styles.container}>{children}</div>
}

export default Container