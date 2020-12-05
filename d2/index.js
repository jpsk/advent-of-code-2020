const fs = require('fs');
const input = fs
  .readFileSync('./input.txt', 'utf8')
  .split('\n')
  .map((n) => n.split(' '))
  .map((i) => {
    return {
      range: i[0].split('-').map((j) => parseInt(j, 10)),
      char: i[1].replace(':', ''),
      password: i[2],
    };
  });

function day1(input) {
  return input.reduce((p, c) => {
    const ch = c.password.split('').filter((i) => i === c.char);
    return p + (ch.length >= c.range[0] && ch.length <= c.range[1]);
  }, 0);
}

console.log(day1(input));

function day2(input) {
  return input.reduce((p, { range, char, password: pw }) => {
    return p + ((pw[range[0] - 1] === char) ^ (pw[range[1] - 1] === char));
  }, 0);
}

console.log(day2(input));
