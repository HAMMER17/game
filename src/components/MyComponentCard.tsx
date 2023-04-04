import { FC } from 'react'
import { CardData } from '../types'
import Card from './Card'

interface MyProps {
  cards: CardData[]
  onAttack: (card: CardData) => void
}

const MyComponentCard: FC<MyProps> = ({ cards, onAttack }) => {
  return (
    <div className='player'>
      {cards.map((el, id) => (
        <Card card={el} key={id} onClick={() => onAttack(el)} />
      ))}
    </div>
  )
}

export default MyComponentCard
