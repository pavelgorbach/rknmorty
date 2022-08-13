import { useContext, useEffect } from "react"
import { getCharacters } from "../api"
import { AppContext } from "../context/AppProvider"
import useDebouncedValue from "../hooks/useDebounceValue"
import Empty from "./Empty"
import Loader from "./Loader"
import Button from "./Button"
import GalleryItem from "./GalleryItem"
import styles from './Gallery.module.css'

function Gallery() {
  const { state, dispatch } = useContext(AppContext)
  const debouncedFilterParams = useDebouncedValue(state.filter)

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getCharacters(debouncedFilterParams)
        dispatch({ type: 'SET_CHARACTERS', payload: data })
      } catch(e) {
        dispatch({ type: 'RESET_CHARACTERS'})
      }
    }

    loadData()
  }, [dispatch, debouncedFilterParams])

  const next = async () => {
    try {
      const data = await getCharacters(state.filter, state.characters.info.next)
      dispatch({ type: 'PATCH_CHARACTERS', payload: data})
    } catch (e) {
      //do something
    }
  }

  return (
    <div className={styles.container}>
      {state.loading && <Loader />}
      {state.characters.info.count === 0 && <Empty />}
      {state.characters.info.count !== 0 && (
        <div className={styles.itemsContainer}>
          {Object.values(state.characters.items).map((item) => {
            return <GalleryItem key={item.id} id={item.id} /> 
          })}
          {state.characters.info.next !== null && <Button onClick={next}>More</Button>}
        </div>
      )}
    </div>
  )
}

export default Gallery 
