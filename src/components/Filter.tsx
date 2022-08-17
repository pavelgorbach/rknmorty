import { useState, useCallback, useRef, memo } from 'react'

import styles from './Filter.module.scss'

import { FilterParams } from '../types'
import { shallowObjEqual } from '../utils'
import FilterInput from "./FilterInput"
import FilterSelect from "./FilterSelect"
import ColorLine from './ColorLine'

type Props = {
  onChange(params: FilterParams): void
}

export const INITIAL_FILTER_PARAMS: FilterParams = {
  name: '',
  species: '',
  status: '',
  type: '',
  gender: '',
}

const statusOptions = ['', 'alive', 'dead', 'unknown'] as FilterParams["status"][]
const genderOptions = ['', 'male', 'female', 'genderless', 'unknown'] as FilterParams["gender"][]

const Button = memo((p: { children: string; for?: string; disabled?: boolean; onClick?(e: any): void }) => {
  return <button className={styles.button} disabled={p.disabled} onClick={p.onClick}>{p.children}</button>
})

export default memo(function Filter(p: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const filterParams = useRef<FilterParams>(INITIAL_FILTER_PARAMS)
  const [isOpen, setOpen] = useState(false)
  const [isDirty, setDirty] = useState(false)
  
  const onChange = useCallback((params: Partial<FilterParams>) => {
    const updatedParams = {
      ...filterParams.current,
      ...params
    }
    filterParams.current = updatedParams
    p.onChange(updatedParams)
    
    setDirty(x => !shallowObjEqual(filterParams.current, INITIAL_FILTER_PARAMS))
  },[p])

  const reset = useCallback((e: any) => {
    formRef.current?.reset()
    onChange(INITIAL_FILTER_PARAMS)
  }, [onChange])

  const toggle = useCallback(() => setOpen((x) => !x), [] )

  return (
    <div className={styles.container}>
      <form ref={formRef}>
        <div className={styles.inputsContainer}>
          <FilterInput<FilterParams['name']>
            name="name"
            initialValue={INITIAL_FILTER_PARAMS.name}
            onChange={onChange}
          />
            
          {isOpen && (
            <>
              <FilterInput<FilterParams['species']>
                name="species"
                initialValue={INITIAL_FILTER_PARAMS.species}
                onChange={onChange}
              />
              <FilterInput
                name="type"
                initialValue={INITIAL_FILTER_PARAMS.type}
                onChange={onChange}
              />
              <FilterSelect<FilterParams['status']>
                name="status"
                initialValue={INITIAL_FILTER_PARAMS.status}
                options={statusOptions}
                onChange={onChange}
              />
              <FilterSelect<FilterParams['gender']>
                name="gender"
                initialValue={INITIAL_FILTER_PARAMS.gender}
                options={genderOptions}
                onChange={onChange}
              />
            </>
          )}
        </div>
      </form>

      <div className={styles.buttonsContainer}>
        <ColorLine color={isDirty ? 'green' : 'yellow'} />
        <Button onClick={toggle}>{isOpen ? 'Close' : 'Filter'}</Button>

        {isOpen && (
          <Button onClick={reset} disabled={!isDirty}>Reset</Button>
        )}
      </div>
    </div>
  )
})
