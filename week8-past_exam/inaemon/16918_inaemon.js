/** 백준 16918: 봄버맨 (구현/실버1)
 *
 * <행렬>
 * 크기가 R×C인 직사각형 격자판
 * 
 * <붐버맨: 폭탄설치맨>
 * 1. 일부 칸에 폭탄을 설치
 * 2. 1초: 아무 일 X
 * 3. 1초: 모든 칸에 폭탄 설치
 * 4. 1초: 1번에서 폭탄이 있는 칸 + 인접한 4칸 빈칸, 그 외 폭탄 설치
 * 
 * N초 후 격자판 상태 구하기
 */

// 행렬 프린트 함수
const printMatrix = (matrix) => {
    matrix.forEach(row => console.log(row.join('')));
};

// 폭탄 터진 후 결과 함수
const explode = (matrix, R, C) => {
    const fullBomb = Array.from({ length: R }, () => Array(C).fill("O"));
    const coordi = [[0,1],[0,-1],[1,0],[-1,0]];

    for (let y = 0; y < R; y++) {
        for (let x = 0; x < C; x++) {
            // 폭탄이 설치된 곳
            if (matrix[y][x] === 'O') {
                // 폭탄이 설치된 곳 터져
                fullBomb[y][x] = '.';

                // 폭탄이 설치된 곳 주변 터져
                coordi.forEach(([dy, dx]) => {
                    const ny = y + dy;
                    const nx = x + dx;

                    // 범위를 벗어나지 않으면
                    if (ny >= 0 && ny < R && nx >= 0 && nx < C) {
                        // 터져
                        fullBomb[ny][nx] = '.';
                    }
                });
            }
        }
    }
    return fullBomb;
};

// input(int, int, int, char matrix): 행렬 행 R, 열 C, 시간 N, 문자 행렬
// output(char matrix): 문자 행렬
function solution(R, C, N, matrix) {
  const fullBomb = Array.from({ length: R }, () => Array(C).fill("O"));
  
  // case1. 1초면
  if(N === 1) {
    // 그대로 출력
    printMatrix(matrix);
    //matrix.forEach(row => console.log(row.join('')));
    return;
  }

  // case2. 짝수면
  if(N%2 === 0) {
    // 모든 칸 폭탄
    printMatrix(fullBomb);
    //answer.forEach(row => console.log(row.join('')));
    return;
  }

  // 홀수면
  // case3. 3초, 7초, 11초, ... 단위로 지났다면
  if(N%4 === 3) {
    // 처음 상태에서 1번 폭발
    printMatrix(explode(matrix, R, C));
    //printMatrix(explode(matrix));  // 실수한 코드: 파라미터 전달 안 함

  // case4. 5초, 9초, 13초, ... 단위로 지났다면
  }else {
    // 처음 상태에서 2번 폭발
    printMatrix(explode(explode(matrix, R, C), R, C));
    //printMatrix(explode(explode(matrix, R, C)));  // 실수한 코드: 파라미터 전달 안 함
  }
}


// 입력
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let idx = 0;
// 첫째 줄에서 입력한 값 (정수 3개)
const [R, C, N] = input[idx++].split(" ").map(Number);

// 둘째~줄에서 입력한 값 (정수 R개)
const matrix = [];
for(let i=0; i<R; i++) {
  const row = input[idx++].split("");
  matrix.push(row);
}

// 출력
solution(R, C, N, matrix);
