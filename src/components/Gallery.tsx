import { useEffect, useCallback, UIEvent, memo } from "react"

import { getCharactersAsync } from "../context/reducer"
import { useApp } from "../context/context"

import Empty from "./Empty"
import Loader from "./Loader"
import GalleryItem from "./GalleryItem"

import styles from './Gallery.module.css'

export default memo(function Gallery() {
  const { state: { loading, characters, filterParams }, dispatch } = useApp()

  useEffect(() => {
    getCharactersAsync({ dispatch, filterParams })
  }, [dispatch, filterParams ])
  
  const next = useCallback(async () => {
    if(!characters?.info.next) return
    getCharactersAsync({ dispatch, filterParams, characters, next: characters.info.next })
  }, [characters, dispatch, filterParams])

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
        {characters.ids.map((id) => <GalleryItem key={id} id={id} />)}
      </div>
    </div>
  )
})
