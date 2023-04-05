import { observer } from "mobx-react-lite"
import { FC, useEffect } from "react"
import ToComponentCard from "../components/ToComponentCard"
import MyComponentCard from "../components/MyComponentCard"
import { game } from "../story/Game"
import { myCard } from "../story/MyCard"
import { tyCard } from "../story/TyCard"
import BattleComponentCard from "../components/BattleComponentCard"
import { battle } from "../story/Battle"
import { CardData } from "../types"
import DeckComponent from "../components/DeckComponent"
import MyActon from "../components/MyActon"
import GameOverComponent from "../components/GameOverComponent"
import joker from '../images/j2.png'


const Main: FC = observer(() => {

  const gameStart = () => {
    // game.startGame()
    const { firstMyCards, firstTyCards } = game.startGame()
    myCard.addCard(firstMyCards)
    tyCard.addCard(firstTyCards)

  }
  const toAction = () => {
    if (!game.isMyStep) {
      const allCardBattle = [...battle.cards.ty, ...battle.cards.my]
      const tyMinCard = tyCard.defineCardAction(allCardBattle)
      if (tyMinCard) {
        battle.addTyCard(tyMinCard)
      } else {
        battle.clearBattle(myCard, tyCard)
      }
    }
  }
  useEffect(gameStart, [])
  // eslint-disable-next-line
  useEffect(toAction, [game.isMyStep])

  const clickMyCard = (card: CardData) => {
    if (game.isMyStep) {
      const myStepCard = myCard.myStep(card, [...battle.cards.my, ...battle.cards.ty])
      if (myStepCard) {
        battle.addMyCard(myStepCard)
      }
    }
  }
  const getCard = () => {

    myCard.addCard([...battle.cards.my, ...battle.cards.ty])
    game.toggleStep()
    game.setIsGetCard(true)
    battle.clearBattle(myCard, tyCard)
  }

  return (
    <div className="app">
      <ToComponentCard cards={tyCard.cards} />
      <div className="battle">
        <img src={joker} alt="joker" />
        <BattleComponentCard cards={battle.cards} />
      </div>
      <MyComponentCard cards={myCard.cards} onAttack={clickMyCard} />

      <div className="trump">
        <div className="card cozur" >
          <DeckComponent trump={game.trumpCard} />
        </div>
      </div>
      <div className="lenght">
        <p>Осталось карт в колоде</p>
        <h2> {game.deckCard.length}</h2>
      </div>
      <MyActon onGetCard={getCard} isAttack={game.isMyAttack} onClean={() => battle.clearBattle(myCard, tyCard)} />
      <GameOverComponent isWin={!myCard.cards.length} gameRestart={gameStart}
        isShow={!game.deckCard.length && (!myCard.cards.length || !tyCard.cards.length)} />
    </div>
  )
})

export default Main
