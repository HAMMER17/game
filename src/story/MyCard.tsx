import { makeObservable, observable } from "mobx";
import { CardData } from "../types";
import PlayerCard from "./PlayerCard";
import { game } from "./Game";


class MyCard extends PlayerCard {
  cards: Array<CardData> = []
  constructor() {
    super()
    makeObservable(this, {
      cards: observable
    })
  }
  myStep(card: CardData, cardBattle: CardData[]) {
    if (game.isMyAttack) {
      return this.myAttack(card, cardBattle)
    }
    return this.myDefence(card, game.attackCard)
  }

  myAttack(card: CardData, cardBattle: CardData[]) {
    if (!cardBattle.length || cardBattle.some(el => el.rank === card.rank)) {
      game.setAttackCard(card)
      this.reducerCard(card.id)
      return card
    }
    alert("This Card don't not here ")
  }
  myDefence(card: CardData, attackCard: CardData) {
    const resultCard = card.rank > attackCard.rank && card.type === attackCard.type
    const resultTrump = attackCard.type !== game.trumpCard && card.type === game.trumpCard
    if (resultCard || resultTrump) {
      this.reducerCard(card.id)
      return card;
    }
    alert('Him Card stronger')
  }

}
const myCard = new MyCard()
export { myCard };