import { useState, useCallback, memo } from 'react'

import { shallowObjEqual, debounce } from '../utils'
import { FilterParams } from '../types'
import { useAppContext } from '../context/context'
import { INITIAL_FILTER_PARAMS, patchFilter} from '../context/reducer'

import Button from "./Button"
import FilterInput from "./FilterInput"
import FilterSelect from "./FilterSelect"

import styles from './Filter.module.css'

const statusOptions = ['', 'alive', 'dead', 'unknown'] as FilterParams["status"][]
const genderOptions = ['', 'male', 'female', 'genderless', 'unknown'] as FilterParams["gender"][]

export default memo(function Filter() {
  const { state: { filterParams }, dispatch } = useAppContext() 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onChangeDebounced = useCallback(
    debounce((filterParams) => {
      dispatch(patchFilter(filterParams))
    }
  ), [])

  const onChange = useCallback((params: Partial<FilterParams>) => {
    onChangeDebounced(params)
  }, [onChangeDebounced])

  const onReset = useCallback(() => {
    dispatch(patchFilter(INITIAL_FILTER_PARAMS))
  }, [dispatch])

  const [isOpened, setOpen] = useState(false)
  const isEqual = shallowObjEqual(filterParams || INITIAL_FILTER_PARAMS, INITIAL_FILTER_PARAMS)
  const onToggle = useCallback(() => {
    setOpen(!isOpened)
  }, [isOpened])

  return (
    <div className={styles.container}>
      <div className={styles.inputsContainer}>
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
        <div className={isEqual ? styles.gray : styles.green}></div>
        <Button onClick={onToggle}>{isOpened ? 'Close' : 'Filter'}</Button>
        {isOpened && <Button onClick={onReset} disabled={isEqual}>Reset</Button>}
      </div>
    </div>
  )
})
