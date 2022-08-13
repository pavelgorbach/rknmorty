import { useContext, useEffect } from "react"
import { getCharacters } from "../api"
import { AppContext } from "../context/AppProvider"
import useDebouncedValue from "../hooks/useDebounce"
import Empty from "./Empty"
import Loader from "./Loader"
import GalleryItem from "./GalleryItem"
import Button from "./Button"
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

  if(state.loading) {
    return <Loader />
  }

  if(Object.keys(state.characters.items).length === 0) {
    console.log('HOKM')
    return <Empty />
  }

  return (
    <div className={styles.container}>
      {Object.values(state.characters.items).map((item) => {
        return <GalleryItem key={item.id} id={item.id} /> 
      })}
      {state.characters.info.next !== null && <Button onClick={next}>More</Button>}
    </div>
  )
}

export default Gallery 
