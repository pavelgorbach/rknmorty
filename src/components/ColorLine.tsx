import { memo } from 'react'

import styles from './ColorLine.module.scss'
import { DTO } from '../types'

export type StatusColor = 'green' | 'yellow' | 'red'

export const STATUS_COLOR_MAP: Record<DTO.Character["status"], StatusColor> = {
  'Alive': 'green',
  'Dead': 'red',
  'unknown': 'yellow'
}

export default memo(function StatusColorLine(p: { color: StatusColor }) {
  return <div className={[styles.container, styles[p.color]].join(' ')}></div> 
})
