const input = require('fs').readFileSync('./input.txt', 'utf8').split('\n');

// Helpers
const toBinString = (i) => i.replace(/[B,R]/g, '1').replace(/[F,L]/g, '0');
const int = (i) => parseInt(i, 2);
const data = input.map(toBinString).map(int);

// Part 1
const max = Math.max(...data);
console.log({ max });

// Part 2
const full = [...Array(input.length + 1).keys()].map((i) => max - i);
const ans = [...full, ...data].reduce((p, c) => p ^ c);
console.log({ ans });
