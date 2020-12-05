const input = require('fs').readFileSync('./input.txt', 'utf8').split('\n');
// const input = require("fs").readFileSync("./test.txt", "utf8").split("\n");

function count(input, instructions) {
  let pos = [0, 0];
  let count = 0;
  const rowLength = input[0].length;

  const getNextStep = ([y, x]) => [
    y + instructions.down,
    (x + instructions.right) % rowLength,
  ];

  const exists = (input, [y, x]) => (input[y] || [])[x] === '#';

  input.forEach(() => {
    count += exists(input, pos);
    pos = getNextStep(pos);
  });

  return count;
}

console.log(count(input, { right: 3, down: 1 }));

const arr = [
  count(input, { right: 3, down: 1 }),
  count(input, { right: 1, down: 1 }),
  count(input, { right: 5, down: 1 }),
  count(input, { right: 7, down: 1 }),
  count(input, { right: 1, down: 2 }),
];

console.log(arr.reduce((p, c) => p * c));
