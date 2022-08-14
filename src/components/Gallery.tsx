import { useContext, useEffect, useCallback, UIEvent } from "react"

import { AppContext } from "../context/AppProvider"
import { getCharacters } from "../api"
import { debounce } from "../utils"
import Empty from "./Empty"
import Loader from "./Loader"
import CharacterCard from "./CharacterCard"
import GalleryItem from "./GalleryItem"

import styles from './Gallery.module.css'

export default function Gallery() {
  const { state, dispatch } = useContext(AppContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getDebouncedCharacters = useCallback(
    debounce(async (filterParams) => {
      try {
        const data = await getCharacters(filterParams)
        dispatch({ type: 'SET_CHARACTERS', payload: data })
        dispatch({ type: 'SET_LOADING', payload: false })
      } catch(e) {
        dispatch({ type: 'SET_CHARACTERS', payload: null})
        dispatch({ type: 'SET_LOADING', payload: false })
      }
    }, 300),
    []
  )

  useEffect(() => {
      dispatch({ type: 'SET_LOADING', payload: true })
      getDebouncedCharacters(state.filter)
  }, [dispatch, getDebouncedCharacters, state.filter])

  const next = async () => {
    if(!state.characters?.info.next) {
      return
    }

    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const data = await getCharacters(state.filter, state.characters.info.next)
      dispatch({ type: 'PATCH_CHARACTERS', payload: data})
      dispatch({ type: 'SET_LOADING', payload: false })
    } catch (e) {
      console.error(e)
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    if(e.currentTarget.scrollHeight <= e.currentTarget.scrollTop + e.currentTarget.clientHeight) {
      next()
    }
  }

  if (state.characters === null || state.characters.info.count === 0) {
    return (
      <div className={styles.container}>
        {state.loading && <Loader />}
        <Empty />
      </div>
    )
  }

  return (
    <>
      <div className={styles.container}>
        {state.loading && <Loader />}
        <div className={styles.itemsContainer} onScroll={onScroll}>
          {state.characters.ids.map((id) => <GalleryItem key={id} id={id} />)}
        </div>
      </div>
      
      <CharacterCard />
    </>
  )
}
