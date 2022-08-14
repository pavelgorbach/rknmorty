import { useState, useContext } from 'react'

import { AppContext } from "../context/AppProvider"
import FilterInput from "./FilterInput"
import FilterSelect from "./FilterSelect"
import Button from "./Button"

import styles from './Filter.module.css'

export default function Filter() {
  const { state, dispatch } = useContext(AppContext)
  const [isOpened, setOpen] = useState(false)
    
  const onFilterReset = () => {
    dispatch({ type: 'SET_FILTER', payload: null })    
  }

  const toggleFilter = () => {
    setOpen(!isOpened)
  }

  if(!isOpened) {
    return (
      <div className={styles.container}>
        <div>Rick and Morty</div>
        <div className={styles.filterButtonContainer}>
          <div className={state.filter ? styles.green : styles.gray}></div>
          <Button onClick={toggleFilter}>Filter</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div>
        <FilterInput name="name" />
        <FilterInput name="species" />
        <FilterInput name="type" />
        <FilterSelect name="status" options={['alive', 'dead', 'unknown']}/>
        <FilterSelect name="gender" options={['male', 'female', 'genderless', 'unknown']} />
      </div>
      <div className={styles.buttons}>
        <div className={state.filter ? styles.green : styles.gray}></div>
        <Button onClick={toggleFilter}>Close</Button>
        <Button onClick={onFilterReset} disabled={!state.filter}>Reset</Button>
      </div>
    </div>
  )
}
