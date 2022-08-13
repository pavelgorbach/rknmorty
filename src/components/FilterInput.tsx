import { ChangeEvent, useContext } from "react"

import { AppContext } from "../context/AppProvider"
import { FilterParams } from "../context/types"

import styles from './FilterInput.module.css'

type Name = Omit<FilterParams, 'status' | 'gender'>

function FilterInput(p: {name: keyof Name}) {
  const { state, dispatch } = useContext(AppContext)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_FILTER', payload: {[p.name]: e.target.value} })
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>{p.name}</label>
      <input className={styles.input} value={state?.filter?.[p.name] || ''} onChange={onChange} />
    </div>
  )
}

export default FilterInput
