import { Character } from "../context/types";
import styles from './CharacterCard.module.css'

function CharacterCard(props: Omit<Character, 'id'>) {
  const {image, name, status, species, type, gender, location, origin} = props

  return (
    <div className={styles.container}>
      <img alt={name} src={image} className={styles.image} />
      <div className={styles.textContainer}>
        <h1>{name}</h1>
        <div>{status} - {gender}</div>
        <div>{species}</div>
        <div>{type}</div>
        <div className={styles.label}>Last known location:</div> 
        <div>{location.name}</div> 
        <div className={styles.label}>First seen in:</div>
        <div>{origin.name}</div>
      </div>
    </div>
  )
}

export default CharacterCard