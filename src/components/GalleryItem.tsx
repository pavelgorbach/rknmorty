import { useEffect, useRef } from 'react'

import { useApp } from '../context/context'

import StatusColorLine from './StatusColorLine'

import styles from './GalleryItem.module.css'

export default function GalleryItem(p: {id: string}) {
  const { state, dispatch } = useApp() 
  const itemRef = useRef<HTMLElement>(null)
  const character = state.characters?.items[p.id]
  const isActive = state.selectedCharacter === p.id 

  useEffect(() => {
    if(isActive) {
      itemRef.current?.scrollIntoView()
    } 
  }, [isActive])

  if(!character) {
    return null
  }

  const onClick = () => {
    dispatch({ type: 'SELECT_CHARACTER', payload: p.id })
  }

  return (
    <article ref={itemRef} className={[styles.container, isActive && styles.active ].join(' ')} onClick={onClick}>
      <img alt={character.name} className={styles.img} src={character.image} />
      <StatusColorLine status={character.status}/>
      <div className={styles.title}>{character.name}</div>
    </article>
  )
}
