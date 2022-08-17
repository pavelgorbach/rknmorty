import { SyntheticEvent } from 'react'
import { DTO } from '../types'
import styles from './CharacterModal.module.scss'
import ColorLine, { STATUS_COLOR_MAP } from "./ColorLine"

type Props = {
  id: DTO.CharacterId
  name: string
  img: string
  status: DTO.Character["status"]
  species: string
  gender: string
  type: string
  location: string
  origin: string
  close(): void
  onClick(id: DTO.CharacterId): void
}

export default function CharacterModal(p: Props) {
  const onClick = (e: SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation()
    p.onClick(p.id)
  }

  return (
    <div className={styles.overlay} onClick={p.close}>
      <div className={styles.container} onClick={onClick}>
        <img alt={p.name} src={p.img} className={styles.img} />

        <ColorLine color={STATUS_COLOR_MAP[p.status]} />

        <div className={styles.details}>
          <h1>{p.name}</h1>
          <div>{p.status.toUpperCase()} - {p.gender}</div>
          <div>{p.species}</div>
          <div>{p.type}</div>
          <div className={styles.label}>Last known location:</div> 
          <div>{p.location}</div> 
          <div className={styles.label}>First seen in:</div>
          <div>{p.origin}</div>
        </div>
      </div>
    </div>
  )
}