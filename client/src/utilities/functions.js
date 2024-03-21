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
  const [start, end] = [randInt(strLength / 10), randInt(strLength / 3)].sort(
    (a, b) => a - b
  );

  const k = `${str.slice(start, end)}${start + end}`;

  return k;
}

const poem =
  "messe ocus pangur ban cechtar nathar fria saindan bith a menmasam fri seilgg mu menma cein im saincheirdd araimse fos ferr cach clu oc mu lebran leir ingnu ni foirmtech frimm pangur ban caraid cesin a maccdan orubiam scel cen scis innar tegdais ar noendis taithiunn dichrichide clius ni fristarddam arnathius gnath huaraib ar gressaib gal glenaid luch inna linsam os me dufuit im lin chein dliged ndoraid cu ndroncheill fuachaidsem fri frega fal a rosc anglese comlan fuachimm chein fri fegi fis mu rosc reil cesu imdis faelidsem cu ndene dul hinglen luch inna gerchrub hi tucu cheist ndoraid ndil os me chene am faelid cia beimmi amin nach re, ni derban cach a chele maith la cechtar nar a dan, subaigthius a oenuran he fesin as choimsid dau in muid dungni cach oenlau du thabairt doraid du gle for mu mud cein am messe";

const str = poem.replaceAll(" ", "");
const strLength = str.length;
