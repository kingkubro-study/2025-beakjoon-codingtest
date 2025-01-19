// 차집합 구하는 함수 생성
function difference(setA, setB) {
  let _difference = new Set(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
// let input = require("fs").readFileSync("exam.txt").toString().split("\n");

const numbers = input[0].split(" ");

const _A = parseInt(numbers[0]);
const _B = parseInt(numbers[1]);

const A = new Set();
const B = new Set();

input[1] = input[1].split(" ");
input[2] = input[2].split(" ");

for (let index = 0; index < _A; index++) {
  A.add(input[1][index]);
}

for (let index = 0; index < _B; index++) {
  B.add(input[2][index]);
}

const a_b = difference(A, B);
const b_a = difference(B, A);

const answer = a_b.size + b_a.size;

console.log(answer);
