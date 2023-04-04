import { FC } from 'react'

interface ShowProps {
  isShow: boolean
  isWin: boolean
  gameRestart: () => void
}

const GameOverComponent: FC<ShowProps> = ({ isShow, isWin, gameRestart }) => {
  return isShow ? (
    <div className='win'>

      <h3 className={isWin ? 'show' : 'lose'}>
        {isWin ? 'Ты выиграл молодец!' : 'Увы! Ты проиграл.... '}
      </h3>
      <button onClick={gameRestart}>Попробуй снова</button>
    </div>
  ) : null
}

export default GameOverComponent
