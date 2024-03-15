export const randInt = () => Math.floor(Math.random() * 6) + 1;

export const sumUp = (nums) => {
  return nums.reduce((acc, curr) => acc + curr, 0);
};

export const renderSortedRolledDiceStr = (dice) => dice.sort().join(" ");

export function filterDiceAndCalculateLength(dice, val) {
  return dice.filter((num) => num === val).length;
}

export function calculateMatchedLength(unique, dice) {
  return dice.filter((dice) => dice === unique).length;
}
