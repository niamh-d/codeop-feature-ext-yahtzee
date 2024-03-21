export const randInt = (num) => Math.floor(Math.random() * num) + 1;

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

export function randKey() {
  const [start, end] = [randInt(strLength / 5), randInt(strLength / 5)].sort(
    (a, b) => a - b
  );

  const k = `${str.slice(start, end)}${start + end}`;

  return k;
}

const poem =
  "messe ocus pangur ban cechtar nathar fria saindan bith a menmasam fri seilgg mu menma céin im saincheirdd araimse fos ferr cach clu oc mu lebran leir ingnu ni foirmtech frimm pangur ban caraid cesin a maccdan";

const str = poem.replaceAll(" ", "");
const strLength = str.length;
