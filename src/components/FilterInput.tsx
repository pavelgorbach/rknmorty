import { ChangeEvent, useContext } from "react"
import { AppContext } from "../context/AppProvider"
import { FilterParams } from "../context/types"

import styles from './FilterInput.module.css'

type Name = Omit<FilterParams, 'status' | 'gender'>

type Props = {
  name: keyof Name
}

function FilterInput({ name }: Props) {
  const { state, dispatch } = useContext(AppContext)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'SET_FILTER',
      payload: {[name]: e.target.value}
    })
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>{name}</label>
      <input className={styles.input} value={state.filter[name]} onChange={onChange} />
    </div>
  )
}

export default FilterInput
