import { ChangeEvent, memo, useCallback } from "react"

import styles from  './FilterSelect.module.scss'

interface Props<T>{
  name: string
  initialValue: T
  options: T[]
  onChange: (value: {[name: string]: string}) => void
}

function FilterSelect<T extends string>(p: Props<T>) {
  const onChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    p.onChange({[p.name]: e.target.value})
  }, [p])

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={p.name}>{p.name}</label>
      <select className={styles.select} defaultValue={p.initialValue} id={p.name} onChange={onChange} >
        {p.options.map((option) => {
          return <option key={option}>{option}</option>
        })}
      </select>
    </div>
  )
}

export default memo(FilterSelect) as typeof FilterSelect