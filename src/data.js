export const data = []

const changeNum = (card) => {
  switch (card) {
    case 11: return 'J';
    case 12: return 'Q';
    case 13: return 'K';
    case 14: return 'A';
    default: return card;
  }
}

let suits = ['♠', '♥', '♦', '♣']
let num = [6, 7, 8, 9, 10, 11, 12, 13, 14]
// let arr = []
let k = 1;
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 9; j++) {
    if (suits[i] === '♥' || suits[i] === '♦') {
      data.push({ id: k++, type: suits[i], num: changeNum(num[j]), col: 'red', rank: num[j] })
    } else {
      data.push({ id: k++, type: suits[i], num: changeNum(num[j]), col: 'black', rank: num[j] })
    }
  }
}

// for (let i = 0; i < 36; i++) {
//   data.push(arr.splice(Math.floor(Math.random() * arr.length), 1)[0])
// }
