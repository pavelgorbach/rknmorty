import { useContext } from 'react'

import { AppContext } from '../context/AppProvider'
import StatusColorLine from './StatusColorLine'

import styles from './GalleryItem.module.css'

type Props = {
  id: string
}

export default function GalleryItem(p: Props) {
  const { state, dispatch } = useContext(AppContext)
  const character = state.characters?.items[p.id]

  if(!character) {
    return null
  }

  const onClick = () => {
    dispatch({ type: 'SELECT_CHARACTER', payload: p.id })
  }

  return (
    <article className={styles.container} onClick={onClick}>
      <img alt={character.name} className={styles.img} src={character.image} />
      <StatusColorLine status={character.status}/>
      <div className={styles.title}>{character.name}</div>
    </article>
  )
}
