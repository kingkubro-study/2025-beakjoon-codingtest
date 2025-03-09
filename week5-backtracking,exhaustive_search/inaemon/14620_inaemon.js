/** 백준 14620: 꽃길 (완전 탐색/실버2)
 *
 * 3개 꽃 씨앗 1칸 차지 -> 1년후 꽃핌 5칸 차지
 * N*N 정사각 꽃밭, 꽃이 닿지 않게 심기
 * 화단 1칸당 다 다른 비용 발생, 최소 비용 구하기
 */
// 방향벡터: 현재, 상, 하, 좌, 우
const dx = [0, 0, 0, -1, 1];
const dy = [0, -1, 1, 0, 0];

// 최소 비용
let answer = Infinity;

function search(i, j, visited) {
  // 현재 위치 i,j에서 5가지 방향 탐색
  for (let k = 0; k < 5; k++) {
    const x = i + dx[k];
    const y = j + dy[k];

    // 꽃밭 경계 이탈
    if (x < 0 || x >= N || y < 0 || y >= N) return false;

    // 이미 방문
    if (visited[x][y]) return false;
  }

  return true;
}

function dfs(sum, start, matrix, visited) {
  // base case: 꽃 3개를 모두 심었다
  if (start === 3) {
    // 최소 비용의 합 반환
    if (sum < answer) answer = sum; //answer = Math.min(answer, sum);
    return;
  }

  // 꽃밭 완전 탐색
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      // 5가지 방향 모두 겹치지 않아서 꽃을 심을 수 있다
      if (search(i, j, visited)) {
        // 화단 비용
        let price = 0;

        // 현재 위치에서 5가지 방향
        for (let k = 0; k < 5; k++) {
          const x = i + dx[k];
          const y = j + dy[k];
          visited[x][y] = true; // 방문
          price += matrix[x][y];
        }

        //sum+=price; start++; // 다음 노드 탐색
        dfs(sum + price, start + 1, matrix, visited); // 다음 꽃 재귀
        //sum-=price; start--; // 노드 복구 (백트래킹)

        // 방문 복구
        for (let k = 0; k < 5; k++) {
          const x = i + dx[k];
          const y = j + dy[k];
          visited[x][y] = false; // 방문 해제
        }
      }
    }
  }
}

// input(int, int matrix): 꽃밭 크기, 비용 배열
// output(int): 최소 비용
function solution(N, matrix) {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));

  // 완전 탐색
  dfs(0, 0, matrix, visited);

  // 결과 출력
  console.log(answer);
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
  const rows = input[idx++].split(" ").map(Number);
  matrix.push(rows);
}

// 출력
solution(N, matrix);
