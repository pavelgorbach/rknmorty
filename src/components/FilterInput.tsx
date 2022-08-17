import { ChangeEvent, memo, useCallback } from "react"

import styles from './FilterInput.module.scss'
interface Props<P> {
  name: P 
  initialValue: P 
  onChange: (value: { [name: string]: string }) => void
}

function FilterInput<T extends string>(p: Props<T>) {
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    p.onChange({[p.name]: e.target.value})
  }, [p])

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={p.name}>{p.name}</label>
      <input className={styles.input} id={p.name} name={p.name} defaultValue={p.initialValue} type="text" onChange={onChange} />
    </div>
  )
}

export default memo(FilterInput) as typeof FilterInput