import { FC } from "react";


interface ActionProps {
  isAttack: boolean;
  onClean: () => void;
  onGetCard: () => void
}

const MyActon: FC<ActionProps> = ({ isAttack, onClean, onGetCard }) => {
  let classes = ['button']
  if (!isAttack) {
    classes.push('green')
  }
  return (
    <div>
      <button className={classes.join(' ')} onClick={isAttack ? onClean : onGetCard}>
        {isAttack ? 'Бита' : 'Беру'}
      </button>
    </div>
  )
}

export default MyActon;

