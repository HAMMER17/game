import { FC } from 'react'
import { CardData } from '../types';

export interface CardProps {
  card: CardData;
  onClick?: () => void;
}

const Card: FC<CardProps> = ({ card, onClick }) => {
  return (
    <div className='card' style={{ color: card.col }} onClick={onClick}>
      <h2>{card.num}</h2>
      <h3>{card.type}</h3>
    </div>
  )
}
export default Card;
