import FilterInput from "./FilterInput"
import FilterSelect from "./FilterSelect"

import styles from './Filter.module.css'
import Button from "./Button"
import { useContext } from "react"
import { AppContext } from "../context/AppProvider"

function Filter() {
  const { dispatch } = useContext(AppContext)

  const onFilterReset = () => {
    dispatch({ type: 'RESET_FILTER' })    
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
      <Button onClick={onFilterReset}>Reset</Button>
    </div>
  )
}

export default Filter
