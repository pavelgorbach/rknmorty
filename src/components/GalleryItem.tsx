import { useEffect, useRef, memo, useCallback } from 'react'

import styles from './GalleryItem.module.scss'
import { DTO } from '../types'
import LazyImage from './LazyImage'
import StatusColorLine, { STATUS_COLOR_MAP } from './ColorLine'

type Props ={
  id: DTO.CharacterId 
  name: string
  src: string
  status: DTO.Character["status"]
  isActive: boolean
  onClick(id: DTO.CharacterId): void
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
      <LazyImage alt={p.name} src={p.src} width={90} height={90} />
      <StatusColorLine color={STATUS_COLOR_MAP[p.status]} />
      <div className={styles.title}>{p.name}</div>
    </article>
  )
})
