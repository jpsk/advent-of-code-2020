const assert = require('assert');
const input = require('fs')
  .readFileSync('./input.txt', 'utf8')
  .split('\n\n')
  .map((i) => i.replace(/\n/g, ' '))
  .map((i) =>
    i
      .split(' ')
      .map((j) => j.split(':'))
      .reduce((p, c) => ({ ...p, [c[0]]: c[1] }), {})
  );

const fields = [
  'byr', // (Birth Year)
  'iyr', // (Issue Year)
  'eyr', // (Expiration Year)
  'hgt', // (Height)
  'hcl', // (Hair Color)
  'ecl', // (Eye Color)
  'pid', // (Passport ID)
  // "cid", // (Country ID) // Optional
];

const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const validEntries = input.filter((i) =>
  fields.reduce((p, c) => p && !!i[c], true)
);

// Ruleset

const byr = (i) => +i >= 1920 && +i <= 2002;
const iyr = (i) => +i >= 2010 && +i <= 2020;
const eyr = (i) => +i >= 2020 && +i <= 2030;

const hgt = (i) => {
  const r = i.match(/(\d+)(.+)/);
  const data = { h: +r[1], m: r[2] };
  const inc = (i) => +i >= 59 && +i <= 76;
  const cm = (i) => +i >= 150 && +i <= 193;

  return ['cm', 'in'].includes(data.m) && data.m === 'in'
    ? inc(data.h)
    : cm(data.h);
};
const hcl = (i) => /^#[0-9A-F]{6}$/i.test(i);
const ecl = (i) => eyeColors.includes(i);
const pid = (i) => i.length === 9;

// TEST
assert.strictEqual(byr('2002'), true);
assert.strictEqual(byr('2003'), false);
assert.strictEqual(byr(''), false);
assert.strictEqual(hgt('60in'), true);
assert.strictEqual(hgt('190cm'), true);
assert.strictEqual(hgt('190in'), false);
assert.strictEqual(hgt('190'), false);
assert.strictEqual(hcl('#123abc'), true);
assert.strictEqual(hcl('#123abz'), false);
assert.strictEqual(hcl('123abc'), false);
assert.strictEqual(ecl('brn'), true);
assert.strictEqual(ecl('wat'), false);
assert.strictEqual(pid('0123456789'), false);
assert.strictEqual(pid('100000000'), true);

const validate = (e) =>
  byr(e.byr) &&
  iyr(e.iyr) &&
  eyr(e.eyr) &&
  hgt(e.hgt) &&
  hcl(e.hcl) &&
  ecl(e.ecl) &&
  pid(e.pid);

const validate2 = (e) =>
  fields.reduce((p, c) => p && eval(`${c}('${e[c]}')`), 1);

console.log(validEntries.filter(validate).length);
console.log(validEntries.filter(validate2).length);
