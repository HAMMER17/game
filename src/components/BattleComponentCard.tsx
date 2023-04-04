import { FC } from "react";
import { CoupleCard } from "../types";
import Card from "./Card";
import { observer } from "mobx-react-lite";

interface BattleProps {
  cards: CoupleCard
}

const BattleComponentCard: FC<BattleProps> = observer(({ cards }) => {
  return (
    <div>
      <div className="player">
        {cards.ty.map(el => (
          <Card card={el} key={el.id} />
        ))}
      </div>
      <div className="player">
        {cards.my.map(el => (
          <Card card={el} key={el.id} />
        ))}
      </div>
    </div>
  )
})

export default BattleComponentCard;