import _ from 'underscore';

const numbers = [
  '1','2', '3', '4',
  '5', '6', '7', '8',
  '9', '10', '11', '12',
  '13', '14', '15', '',
];

export const startNewGame = () => {
  const shuffledNumbers = _.shuffle(numbers);
  return shuffledNumbers;
};
