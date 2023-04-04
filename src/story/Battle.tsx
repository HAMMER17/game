import { action, makeObservable, observable } from "mobx";
import { CardData, CoupleCard } from "../types";
import { game } from "./Game";

class Battle {
  cards: CoupleCard = {
    my: [],
    ty: []
  }
  constructor() {
    makeObservable(this, {
      cards: observable,
      addMyCard: action,
      addTyCard: action,
    })
  }
  addMyCard = (card: CardData) => {
    this.cards.my.push(card)
    game.toggleStep()
  }
  addTyCard = (card: CardData) => {
    this.cards.ty.push(card)
    game.toggleStep()
  }
  clearBattle<T, K>(myCard: T, tyCard: K) {
    this.cards.my = []
    this.cards.ty = []
    game.addPlayCard(myCard, tyCard)
    if (!game.isGetCard) {
      game.toggleStep()
      game.toggleAttack()
    } else {
      game.setIsGetCard(false)
    }
  }
}
const battle = new Battle()
export { battle }
