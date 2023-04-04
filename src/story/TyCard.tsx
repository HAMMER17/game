
import { CardData } from '../types'
import { game } from './Game'
import PlayerCard from './PlayerCard'
import { action, makeObservable, observable } from 'mobx'


class TyCard extends PlayerCard {
  cards: Array<CardData> = []
  constructor() {
    super()
    makeObservable(this, {
      cards: observable,
      defineCardAttack: action,
    })
  }
  defineCardAction(battleCard: CardData[]) {
    if (game.isMyAttack) {
      return this.defineCardDefence(game.attackCard, battleCard)
    }
    return this.defineCardAttack(battleCard)
  }

  defineCardAttack(battleCard: CardData[]) {
    if (this.cards.length) {
      let cardAttack = null
      if (!battleCard.length) {
        const trumpCard = this.cards.filter(el => el.type === game.trumpCard)
        const notTrump = this.cards.filter(el => el.type !== game.trumpCard)
        if (notTrump.length) {
          cardAttack = this.defineMinCard(notTrump)
        } else {
          cardAttack = this.defineMinCard(trumpCard)
        }
        game.setAttackCard(cardAttack)
        return cardAttack;
      }
      cardAttack = this.defineExitCard(battleCard)
      if (cardAttack) {
        game.setAttackCard(cardAttack)
      }
      return cardAttack;
    }
  }

  defineCardDefence(attackCard: CardData | null, battleCard: CardData[]) {
    if (attackCard) {
      const hanbleCard = this.cards.filter(card => card.type === attackCard?.type
        && card.rank > attackCard?.rank)
      const trumpCards = this.cards.filter(card => card.type === game.trumpCard)
      if (hanbleCard.length) {
        return this.defineMinCard(hanbleCard)
      }
      if (attackCard.type !== game.trumpCard && trumpCards.length) {
        return this.defineMinCard(trumpCards)
      }
      this.addCard(battleCard)
      game.toggleStep()
      game.setIsGetCard(true)
    }
  }
  defineMinCard(cards: CardData[]): CardData {
    const minCard = cards.reduce((acc, curent) => acc?.rank < curent?.rank ? acc : curent)
    if (minCard) {
      this.reducerCard(minCard.id)
    }
    return minCard
  }

  defineExitCard(battleCard: CardData[]) {
    const existCards = this.cards.filter(card => !!battleCard.find(c => c.rank === card.rank))
    return existCards.length ? this.defineMinCard(existCards) : null
  }
}

const tyCard = new TyCard()
export { tyCard }