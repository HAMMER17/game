import { CardData } from "../types";


abstract class PlayerCard {
  abstract cards: Array<CardData>

  reducerCard(id: number): void {
    this.cards = this.cards.filter(el => el.id !== id)
  }
  addCard(card: Array<CardData>): void {
    this.cards = [...this.cards, ...card]
  }
  clearCards(): void {
    this.cards = []
  }
}
export default PlayerCard;
