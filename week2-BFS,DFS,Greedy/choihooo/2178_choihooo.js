/**
 * 백준 2178: 미로탐색 (BFS/실버1)
 *
 * 연산1: BFS를 사용하여 최단 경로 탐색.
 * 연산2: 큐를 활용하여 현재 위치에서 상하좌우로 이동하며, 이동 가능한 칸 탐색.
 * 연산3: 도착점에 도달하면 최단 거리 반환. 도달 가능하다는 조건이 주어졌으므로 실패 조건은 없음.
 *
 * input(int, int, int[][]):
 *   - N: 행 개수
 *   - M: 열 개수
 *   - maze: 미로 배열 (1은 이동 가능, 0은 이동 불가)
 *
 * output(int):
 *   - (1, 1)에서 (N, M)까지 이동하는 최소 칸 수
 */

function solution(N, M, maze) {
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const queue = [[0, 0, 1]]; // [x, y, 거리]
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  visited[0][0] = true;

  while (queue.length > 0) {
    const [x, y, dist] = queue.shift();

    // 도착점 확인
    if (x === N - 1 && y === M - 1) {
      return dist; // 최단 거리 반환
    }

    // 상하좌우 이동
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < N &&
        ny < M && // 미로 범위를 벗어나지 않아야 함
        maze[nx][ny] === 1 && // 이동 가능한 경로
        !visited[nx][ny] // 아직 방문하지 않은 곳
      ) {
        queue.push([nx, ny, dist + 1]);
        visited[nx][ny] = true;
      }
    }
  }

  return -1;
}

// 입력 처리
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
const [N, M] = input[0].split(" ").map(Number);
const maze = input.slice(1, N + 1).map((row) => row.split("").map(Number));

// 결과 출력
console.log(solution(N, M, maze));
