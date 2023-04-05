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
        <div className="card2" key={id}>CARD</div>
        // <Card card={el} key={id} />

      ))}
    </div>
  )
}

export default ToComponentCard;

