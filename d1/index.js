const fs = require("fs");

const input = fs
  .readFileSync("./input.txt", "utf8")
  .split("\n")
  .map((i) => parseInt(i, 10));

let found = false;

// part 1
input.forEach((i) => {
  if (found) {
    return;
  }
  input.slice(0).forEach((j) => {
    if (i + j === 2020) {
      found = true;
      console.log({ i, j });
      console.log(i * j);
    }
  });
});

// part 2
input.forEach((i) => {
  if (found) return;
  const input2 = input.slice(0);
  input2.forEach((j) => {
    if (found) return;
    const input3 = input2.slice(0);
    input3.forEach((k) => {
      if (found) return;
      if (i + j + k === 2020) {
        found = true;
        console.log({ i, j, k });
        console.log(i * j * k);
      }
    });
  });
});
