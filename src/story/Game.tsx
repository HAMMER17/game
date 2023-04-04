import { action, makeObservable, observable } from "mobx";
import { data } from "../data";
import { CardData, TypeCard } from "../types";


class Game {
  trumpCard: TypeCard = TypeCard.by;
  isMyStep: boolean = false;
  isGetCard: boolean = false;
  isMyAttack: boolean = false;
  deckCard: Array<CardData> = [];
  attackCard: CardData = data[0];
  constructor() {
    makeObservable(this, {
      isGetCard: observable,
      isMyStep: observable,
      isMyAttack: observable,
      deckCard: observable,
      attackCard: observable,
      reduceCard: action,
      toggleAttack: action,
      toggleStep: action,
      mixDeck: action,
      startGame: action,
    })
  }
  toggleStep() {
    this.isMyStep = !this.isMyStep
  }
  toggleAttack() {
    this.isMyAttack = !this.isMyAttack
  }
  setIsGetCard(isGetCard: boolean) {
    this.isGetCard = isGetCard
  }
  setAttackCard(card: CardData) {
    this.attackCard = card
  }
  defineStep(myCard: CardData[], tyCard: CardData[]) {
    const myMinTramp = this.minTrumpCard(myCard)
    const tyMinTramp = this.minTrumpCard(tyCard)
    if (myMinTramp) {
      if ((myMinTramp < tyMinTramp) || !tyMinTramp) {
        this.toggleStep()
        this.toggleAttack()
      }
    }
  }

  minTrumpCard(cards: CardData[]) {
    const rankTramp = cards.filter(el => el.type === this.trumpCard).map(el => el.rank)
    if (rankTramp.length) {
      return Math.min(...rankTramp)
    }
    return 0;
  }
  reduceCard(countCard: number): Array<CardData> {
    const removeCard = this.deckCard.splice(0, countCard)
    return removeCard;
  }
  mixDeck() {
    this.deckCard = this.deckCard.sort(() => Math.random() - 0.5)
    this.trumpCard = this.deckCard[this.deckCard.length - 1].type
  }
  addPlayCard(my: any, ty: any) {
    const myNeed = 6 - my.cards.length
    const tyNeed = 6 - ty.cards.length
    my.addCard(this.reduceCard(myNeed > 0 ? myNeed : 0))
    ty.addCard(this.reduceCard(tyNeed > 0 ? tyNeed : 0))
  }
  startGame() {
    this.deckCard = data;
    this.mixDeck()
    const firstTyCards = this.reduceCard(6)
    const firstMyCards = this.reduceCard(6)
    this.defineStep(firstMyCards, firstTyCards)
    return { firstTyCards, firstMyCards }
  }
}
const game = new Game();
export { game }