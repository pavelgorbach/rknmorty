import { useEffect, useRef, memo, useCallback } from 'react'

import LazyImage from './LazyImage'
import { Status } from '../types'

import StatusColorLine from './StatusColorLine'

import styles from './GalleryItem.module.css'

type Props ={
  id: string
  name: string
  status: Status 
  src: string
  isActive: boolean
  onClick(id: string): void
}

export default memo(function GalleryItem(p: Props) {
  const itemRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if(p.isActive) {
      itemRef.current?.scrollIntoView()
    } 
  }, [p.isActive])

  const onItemClick = useCallback(() => {
    p.onClick(p.id)
  }, [p])
  
  return (
    <article ref={itemRef} className={[styles.container, p.isActive && styles.active ].join(' ')} onClick={onItemClick}>
      <LazyImage alt={p.name} src={p.src} />
      <StatusColorLine status={p.status}/>
      <div className={styles.title}>{p.name}</div>
    </article>
  )
})
