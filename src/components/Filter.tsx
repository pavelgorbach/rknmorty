import { useState } from 'react'
import FilterInput from "./FilterInput"
import FilterSelect from "./FilterSelect"
import Button from "./Button"
import { useContext } from "react"
import { AppContext } from "../context/AppProvider"
import styles from './Filter.module.css'

function Filter() {
  const { state, dispatch } = useContext(AppContext)
  const [isOpened, setOpen] = useState(false)
    
  const onFilterReset = () => {
    dispatch({ type: 'RESET_FILTER' })    
  }

  const toggleFilter = () => {
    setOpen(!isOpened)
  }

  return (
    <div className={styles.container}>
      {!isOpened && (
        <>
          <div>Rick and Morty</div>
          <div className={styles.filterButtonContainer}>
            <div className={state.filtered ? styles.green : styles.gray}></div>
            <Button onClick={toggleFilter}>Filter</Button>
          </div>
        </>
      )}
      {isOpened && (
        <>
          <div>
            <FilterInput name="name" />
            <FilterInput name="species" />
            <FilterInput name="type" />
            <FilterSelect name="status" options={['alive', 'dead', 'unknown']}/>
            <FilterSelect name="gender" options={['male', 'female', 'genderless', 'unknown']} />
          </div>
          <div className={styles.buttons}>
            <div className={state.filtered ? styles.green : styles.gray}></div>
            <Button onClick={toggleFilter}>Close</Button>
            <Button onClick={onFilterReset} disabled={!state.filtered}>Reset</Button>
          </div>
        </>
      )} 
    </div>
  )
}

export default Filter
