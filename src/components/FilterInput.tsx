import { ChangeEvent, memo, useCallback } from "react"

import styles from './FilterInput.module.css'
interface Props<P> {
  label: P 
  initialValue: P 
  onChange: (value: { [name: string]: string }) => void
}

function FilterInput<T extends string>(p: Props<T>) {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    p.onChange({[p.label]: e.target.value})
  }, [p])

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={p.label}>{p.label}</label>
      <input className={styles.input} id={p.label} defaultValue={p.initialValue} type="text" onChange={onChange} />
    </div>
  )
}

export default memo(FilterInput) as typeof FilterInput