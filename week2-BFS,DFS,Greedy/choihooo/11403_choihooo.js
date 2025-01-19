/**
 * 백준 11403: 경로 찾기 (그래프/실버1)
 *
 * 연산1: 모든 정점 쌍에 대해 간접적으로나마 연결 가능한지 확인 (3중 for 루프 사용).
 * 연산2: 각 중간 정점 k를 거치는 모든 정점 쌍 i, j에 대해, i에서 k로, k에서 j로 갈 수 있다면 i에서 j로 갈 수 있다고 표시 (1 할당).
 * 연산3: 최종적으로 각 정점 쌍 사이의 경로 존재 여부를 출력.
 *
 * 입력:
 * - N: 정점의 수
 * - arr: 인접 행렬, 1은 직접적인 경로가 있음을, 0은 경로가 없음을 나타냄
 *
 * 출력:
 * - 각 정점에서 다른 모든 정점으로의 경로 존재 여부를 인접 행렬 형태로 출력.
 *   각 행은 해당 정점에서 다른 정점으로의 경로 존재 여부를 0 또는 1로 표현함.
 */


// const input = require("fs")
//   .readFileSync("/dev/stdin")
//   .toString()
//   .trim()
//   .split("\n");

const input = require("fs")
  .readFileSync("exam.txt")
  .toString()
  .trim()
  .split("\n");

let N = +input.shift();
let arr = [];

for (const row of input) {
  arr.push(row.split(" ").map(Number));
}

for (let k = 0; k < N; k++) {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (arr[i][k] && arr[k][j]) {
        arr[i][j] = 1;
      }
    }
  }
}

for (let i = 0; i < N; i++) {
  console.log(arr[i].join(" "));
}
