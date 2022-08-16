import { Status } from '../types'

import styles from './StatusColorLine.module.css'

export default function StatusColorLine(p: { status: Status }) {
  let color = p.status === 'alive' ? 'green' : 'gray'

  if(p.status === 'dead') {
    color = 'red'
  }
  
  return <div className={[styles.container, styles[color]].join(' ')}></div> 
}
