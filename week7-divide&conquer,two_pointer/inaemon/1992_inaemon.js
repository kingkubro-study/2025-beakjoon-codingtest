/** 백준 1992: 쿼드트리 (분할 정복/실버1)
 *
 * 정사각형 안에 0만 있으면? 0출력
 * 정사각형 안에 1만 있으면? 1출력
 * 정사각형 안에 0과 1이 섞여있으면? 4분할 후 각각 확인, 괄호로 묶어서 출력
 */
// 풀이1
// 메모리 10096KB, 시간 152ms
function quadtree(x, y, N, matrix) {
  let sum = 0;
  for (let i = x; i < x + N; i++) {
    for (let j = y; j < y + N; j++) {
      sum += matrix[i][j];
    }
  }
  if (sum === N * N) return "1";
  if (sum === 0) return "0";

  // 4분할
  const half = N / 2;
  let result = "(";

  // 왼쪽 위
  result += quadtree(x, y, half, matrix);
  // 오른쪽 위
  result += quadtree(x, y + half, half, matrix);
  // 왼쪽 아래
  result += quadtree(x + half, y, half, matrix);
  // 오른쪽 아래
  result += quadtree(x + half, y + half, half, matrix);

  result += ")";
  return result;
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
  const rows = input[idx++].split("").map(Number); // "" 문자 하나씩 나누기
  matrix.push(rows);
}

// 출력
console.log(quadtree(0, 0, N, matrix));

// 풀이2
// 메모리 12996KB, 시간 168ms
/*
function quadtree(N, matrix) {
  let sum = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      sum += matrix[i][j];
    }
  }
  if (sum === N * N) return "1";
  if (sum === 0) return "0";

  // 4분할
  const half = N / 2;
  let result = "(";

  // 왼쪽 위: 행 0~절반, 열 0~절반
  result += quadtree(
    half,
    matrix.slice(0, half).map((row) => row.slice(0, half))
  );
  // 오른쪽 위: 행 0~절반, 열 절반~끝
  result += quadtree(
    half,
    matrix.slice(0, half).map((row) => row.slice(half))
  );
  // 왼쪽 아래: 행 절반~끝, 열 0~절반
  result += quadtree(
    half,
    matrix.slice(half).map((row) => row.slice(0, half))
  );
  // 오른쪽 아래: 행 절반~끝, 열 절반~끝
  result += quadtree(
    half,
    matrix.slice(half).map((row) => row.slice(half))
  );

  result += ")";
  return result;
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
  const rows = input[idx++].split("").map(Number); // "" 문자 하나씩 나누기
  matrix.push(rows);
}

// 출력
console.log(quadtree(N, matrix));
*/
