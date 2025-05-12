/** 백준 1780: 종이의 개수 (분할 정복/실버2)
 *
 * 종이 행렬(NXN) 자르기
 * 원소: -1 또는 0 또는 1
 * 
 * 종이 조각 (nxn)이 모두 같은 수 -> 그대로 사용
 * 아니면 -> 종이 9분할
 * 
 * -1 / 0 / 1으로 채워진 종이 개수 구하기
 */
const answer = [0, 0, 0];

function solution(x, y, N, matrix) {
  // 첫번째 원소
  const num = matrix[x][y];
  let flag = true;

  // 모든 원소가 같은 지 확인
  for (let i = x; i < x + N; i++) {
    for (let j = y; j < y + N; j++) {
      if(num !== matrix[i][j]) {
        flag = false;
        break;
      }
    }
  }

  // BASE CASE: 모든 원소가 같으면 재귀 종료
  if(flag) {
    switch(num) {
      case -1: answer[0] += 1; break;
      case 0: answer[1] += 1; break;
      case 1: answer[2] += 1; break;
    }

    return;
  }

  // 9분할
  const n = N / 3;

  // 1째줄
  solution(x, y, n, matrix);
  solution(x, y+n, n, matrix);
  solution(x, y+n*2, n, matrix);

  // 2째줄
  solution(x+n, y, n, matrix);
  solution(x+n, y+n, n, matrix);
  solution(x+n, y+n*2, n, matrix);
  
  // 3째줄
  solution(x+n*2, y, n, matrix);
  solution(x+n*2, y+n, n, matrix);
  solution(x+n*2, y+n*2, n, matrix);
}

// 입력
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let idx = 0;
// 첫째 줄에서 입력한 값 (정수 1개)
const N = parseInt(input[idx++]);
// 둘째~줄에서 입력한 값 (행렬 원소)
const matrix = [];
for (let i = 0; i < N; i++) {
  const row = input[idx++].split(" ").map(Number);
  matrix.push(row);
}

// 출력
solution(0, 0, N, matrix);
console.log(answer[0]);
console.log(answer[1]);
console.log(answer[2]);