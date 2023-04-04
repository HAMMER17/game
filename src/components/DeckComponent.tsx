import { FC } from 'react'
import { TypeCard } from '../types'

interface DeckProps {
  trump: TypeCard
}

const DeckComponent: FC<DeckProps> = ({ trump }) => {
  let col = ''
  if (trump === '♥' || trump === '♦') {
    col = 'red'
  } else {
    col = 'black'
  }
  return (
    <div >
      <span>Козырь</span>
      <h2 style={{ color: col }}>{trump}</h2>
    </div>
  )
}

export default DeckComponent
