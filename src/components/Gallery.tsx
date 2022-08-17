import { UIEvent } from "react"

import styles from './Gallery.module.scss'

import Loader from "./Loader"
import GalleryItem from "./GalleryItem"
import { ICharactersGallery } from "../reducers/galleryReducer"
import { DTO } from "../types"

type Props = {
  data: ICharactersGallery.Data
  loadMore: ICharactersGallery.LoadMore
  onItemClick: (characterId: DTO.CharacterId) => void
}

export default function Gallery(p: Props) {
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    if(p.loadMore.status !== 'can-load-more') return
    if(e.currentTarget.scrollHeight <= e.currentTarget.scrollTop + e.currentTarget.clientHeight) {
      p.loadMore.loadMore()
    }
  } 

  if (p.data.status === 'loading') {
    return <div className={styles.container}><Loader /></div>
  }

  if (p.data.status === 'no-data') {
    return <div className={styles.container}>There is nothing here</div>
  }

  if (p.data.status === 'error') {
    return <div className={styles.container}>Something went wrong</div>
  }

  return (
    <div className={styles.container}>
      {p.loadMore.status === 'loading-more' && <Loader />}

      <div className={styles.itemsContainer} onScroll={onScroll}>
        {p.data.characters.map((item) => {
          return (
            <GalleryItem
              key={item.id}
              id={item.id}
              name={item.name}
              status={item.status}
              src={item.image}
              onClick={p.onItemClick}
              isActive={false}
            />
          )
        })}
      </div>
    </div>
  )
}
