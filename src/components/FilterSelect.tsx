import { ChangeEvent, useContext } from "react"

import { AppContext } from "../context/AppProvider"
import { FilterParams } from "../context/types"

import styles from  './FilterSelect.module.css'

type Name = Pick<FilterParams, 'status' | 'gender'>
interface Props<N, O> { name: N; options: O[]} 

function FilterSelect<N extends keyof Name, O extends FilterParams[N]>({ name, options }: Props<N, O>) {
  const { state, dispatch } = useContext(AppContext)

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_FILTER', payload: {[name]: e.target.value}})
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>{name}</label>
      <select value={state?.filter?.[name] || ''} onChange={onChange} className={styles.select}>
        <option></option>
        {options.map((option) => {
          return <option key={option}>{option}</option>
        })}
      </select>
    </div>
  )
}

export default FilterSelect
