import { FC } from "react"
import { CardData } from "../types"
import Card from "./Card"

interface ToProps {
  cards: CardData[]
}

const ToComponentCard: FC<ToProps> = ({ cards }) => {
  return (
    <div className="player" >
      {cards.map((el, id) => (
        <Card card={el} key={id} />

      ))}
    </div>
  )
}

export default ToComponentCard;

