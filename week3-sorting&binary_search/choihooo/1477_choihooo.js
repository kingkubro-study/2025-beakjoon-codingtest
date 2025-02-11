/** 백준 1012: 유기농 배추(DFS&BFS/실버2)
 *
 * 연산1: 입력으로 인접 행렬 생성
 *
 * 연산2: 깊이 우선 탐색으로 탐색
 *
 * 연산3: DFS를 통해 지렁이 수 계산
 */

// input(int, int, int[]): 밭 가로 길이(M), 밭 세로 길이(N), 배추 위치 배열
// output(int): 필요한 지렁이의 최소 수

function solution(N, M, E) {
  let matrix = Array.from({ length: N }, () => Array(M).fill(0));
  let visited = Array.from({ length: N }, () => Array(M).fill(false));
  let count = 0;

  for (let [x, y] of E) {
    matrix[y][x] = 1;
  }

  function bfs(x, y) {
    const queue = [[x, y]];
    visited[y][x] = true;

    while (queue.length > 0) {
      const [cx, cy] = queue.shift();

      for (let [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = cx + dx;
        const ny = cy + dy;

        if (
          nx >= 0 &&
          nx < M &&
          ny >= 0 &&
          ny < N &&
          !visited[ny][nx] &&
          matrix[ny][nx] === 1
        ) {
          visited[ny][nx] = true;
          queue.push([nx, ny]);
        }
      }
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (matrix[i][j] === 1 && !visited[i][j]) {
        bfs(j, i);
        count++;
      }
    }
  }

  return count;
}

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "exam.txt")
  .toString()
  .split("\n");

let T = +input[0].trim();
let cumulativeK = 1;

for (let t = 0; t < T; t++) {
  let [M, N, K] = input[cumulativeK].split(" ").map(Number);
  let E = [];

  for (let i = cumulativeK + 1; i <= cumulativeK + K; i++) {
    E.push(input[i].split(" ").map(Number));
  }

  console.log(solution(N, M, E));

  cumulativeK += K + 1;
}
