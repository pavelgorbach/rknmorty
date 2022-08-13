import styles from './Container.module.css'

export default function Container(p: { children: React.ReactNode}) {
  return <div className={styles.container}>{p.children}</div>
}
