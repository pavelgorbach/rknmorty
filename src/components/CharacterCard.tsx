import { useApp } from "../context/context"
import { selectCharacter } from "../context/reducer"

import Modal from "./Modal"
import StatusColor from "./StatusColorLine"

import styles from './CharacterCard.module.css'

export default function CharacterCard() {
  const { state, dispatch } = useApp() 

  if(!state.selectedCharacter || !state.characters) {
    return null
  }

  const c = state.characters.items[state.selectedCharacter]

  const closeModal = () => {
    dispatch(selectCharacter())
  }

  const onSelectNextCharacter = () => {
    if(!state.characters || !state.selectedCharacter) {
      return
    }

    const currentIdx = state.characters.ids.indexOf(state.selectedCharacter)
    dispatch(selectCharacter(state.characters.ids[currentIdx + 1]))
  }

  return (
    <Modal isOpen={!!state.selectedCharacter} onClose={closeModal}>
      <div className={styles.container} onClick={onSelectNextCharacter}>
        <img alt={c.name} src={c.image} className={styles.image} />
        <StatusColor status={c.status} />
        <div className={styles.textContainer}>
          <h1>{c.name}</h1>
          <div>{c.status.toUpperCase()} - {c.gender}</div>
          <div>{c.species}</div>
          <div>{c.type}</div>
          <div className={styles.label}>Last known location:</div> 
          <div>{c.location.name}</div> 
          <div className={styles.label}>First seen in:</div>
          <div>{c.origin.name}</div>
        </div>
      </div>
    </Modal>
  )
}
