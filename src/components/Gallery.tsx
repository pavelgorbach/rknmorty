import { useEffect, useCallback, UIEvent, memo } from "react"

import { getCharactersAsync, selectCharacter } from "../context/reducer"
import { useAppContext } from "../context/context"

import Empty from "./Empty"
import Loader from "./Loader"
import GalleryItem from "./GalleryItem"

import styles from './Gallery.module.css'

export default memo(function Gallery() {
  const { state: { loading, characters, filterParams, selectedCharacter }, dispatch } = useAppContext()

  useEffect(() => {
    getCharactersAsync({ dispatch, filterParams })
  }, [dispatch, filterParams ])
  
  const next = useCallback(async () => {
    if(!characters?.info.next) return
    getCharactersAsync({ dispatch, filterParams, characters, next: characters.info.next })
  }, [characters, dispatch, filterParams])

  const onItemClick = useCallback((id: string) => {
    dispatch(selectCharacter(id))
  }, [dispatch])

  const onScroll = useCallback((e: UIEvent<HTMLDivElement>) => {
    if(e.currentTarget.scrollHeight <= e.currentTarget.scrollTop + e.currentTarget.clientHeight) {
      next()
    }
  }, [next])

  if (!characters || characters.info.count === 0) {
    return (
      <div className={styles.container}>
        {loading && <Loader />}
        <Empty />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {loading && <Loader />}
      <div className={styles.itemsContainer} onScroll={onScroll}>
        {characters.ids.map((id) => {
          const character = characters.items[id] 
          return (
            <GalleryItem
              key={id}
              id={id}
              name={character.name}
              status={character.status}
              src={character.image}
              onClick={onItemClick}
              isActive={selectedCharacter === id}
            />
          )
        })}
      </div>
    </div>
  )
})
