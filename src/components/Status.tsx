import { Status as IStatus } from '../context/types'
import styles from './Status.module.css'

function StatusColor({ status }: { status: IStatus }) {
  let color = status === 'alive' ? 'green' : 'gray'
  if(status === 'dead') {
    color = 'red'
  }
  return <div className={[styles.container, styles[color]].join(' ')}></div> 
}

export default StatusColor
