export enum TypeCard {
  ch = "♥",
  by = "♦",
  kr = "♣",
  pi = "♠"
}
export interface CardData {
  id: number;
  rank: number;
  type: TypeCard;
  col: string;
  num: number;
}
export interface CoupleCard {
  my: CardData[];
  ty: CardData[];
}