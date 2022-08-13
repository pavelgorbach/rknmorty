import { useContext, useState } from 'react'
import { AppContext } from '../context/AppProvider'
import Modal from "./Modal"
import CharacterCard from "./CharacterCard"
import styles from './GalleryItem.module.css'

type Props = {
  id: string
}

function GalleryItem({ id }: Props) {
  const { state } = useContext(AppContext)
  const character = state.characters.items[id]

  const [isOpen, setOpen] = useState(false)

  const openItemCard = () => {
    setOpen(true) 
  }

  const closeItemCard = () => {
    setOpen(false)
  }

  return (
    <>
      <article className={styles.container} onClick={openItemCard}>
        <img alt={character.name} className={styles.img} src={character.image} />
        <div className={styles.title}>{character.name}</div>
      </article>

      <Modal isOpen={isOpen} onClose={closeItemCard}>
        <CharacterCard {...character} />
      </Modal>
    </>
  )
}

export default GalleryItem
