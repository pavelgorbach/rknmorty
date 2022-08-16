import { useState, useCallback, memo } from 'react'

import { FilterParams } from '../types'
import { useApp } from '../context/context'
import { INITIAL_FILTER_PARAMS, setFilter } from '../context/reducer'

import Button from "./Button"
import FilterInput from "./FilterInput"
import FilterSelect from "./FilterSelect"

import styles from './Filter.module.css'
import { shallowObjEqual } from '../utils'

const statusOptions = ['', 'alive', 'dead', 'unknown'] as FilterParams["status"][]
const genderOptions = ['', 'male', 'female', 'genderless', 'unknown'] as FilterParams["gender"][]

const Check = memo(() => <div>Check</div>)

export default memo(function Filter() {
  const { state: { filterParams }, dispatch } = useApp() 

  const onChange = useCallback((params: Partial<FilterParams>) => {
    dispatch(setFilter(params))
  }, [dispatch])

  const onReset = useCallback(() => {
    dispatch(setFilter(INITIAL_FILTER_PARAMS))
  }, [dispatch])

  const [isOpened, setOpen] = useState(false)
  const disabledReset = !filterParams ? true : shallowObjEqual(filterParams || {}, INITIAL_FILTER_PARAMS)
    
  const onToggle = useCallback(() => {
    setOpen(!isOpened)
  }, [isOpened])

  return (
    <div className={styles.container}>
      <div className={styles.inputsContainer}>
        <Check />
        <FilterInput<FilterParams['name']>
          label="name"
          initialValue={INITIAL_FILTER_PARAMS.name}
          onChange={onChange}
        />
          
        {isOpened && (
          <>
            <FilterInput<FilterParams['species']>
              label="species"
              initialValue={INITIAL_FILTER_PARAMS.species}
              onChange={onChange}
            />
            <FilterInput
              label="type"
              initialValue={INITIAL_FILTER_PARAMS.type}
              onChange={onChange}
            />
            <FilterSelect<FilterParams['status']>
              label="status"
              initialValue={INITIAL_FILTER_PARAMS.status}
              options={statusOptions}
              onChange={onChange}
            />
            <FilterSelect<FilterParams['gender']>
              label="gender"
              initialValue={INITIAL_FILTER_PARAMS.gender}
              options={genderOptions}
              onChange={onChange} />
          </>
        )}
      </div>

      <div className={styles.buttonsContainer}>
        <div className={styles.green}></div>
        <Button onClick={onToggle}>{isOpened ? 'Close' : 'Filter'}</Button>
        {isOpened && <Button onClick={onReset} disabled={disabledReset}>Reset</Button>}
      </div>
    </div>
  )
})
