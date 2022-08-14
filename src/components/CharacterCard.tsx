import { useContext } from "react";

import { AppContext } from "../context/AppProvider";
import StatusColor from "./StatusColorLine";
import Modal from "./Modal"

import styles from './CharacterCard.module.css'

export default function CharacterCard() {
  const { state, dispatch } = useContext(AppContext)

  if(!state.selectedCharacter || !state.characters) {
    return null
  }

  const c = state.characters.items[state.selectedCharacter]

  const closeModal = () => {
    dispatch({ type: 'SELECT_CHARACTER', payload: null })
  }

  const onSelectNextCharacter = () => {
    if(!state.characters || !state.selectedCharacter) {
      return
    }

    const currentIdx = state.characters.ids.indexOf(state.selectedCharacter)
    dispatch({ type: 'SELECT_CHARACTER', payload: state.characters.ids[currentIdx + 1]})
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
