/**
 * 특정 거리의 도시 찾기: BFS로 특정 거리의 도시를 찾는 문제
 *
 * 연산1: 입력으로 그래프의 인접 리스트 생성
 *
 * 연산2: 너비 우선 탐색으로 최단 거리 계산
 *
 * 연산3: 최단 거리가 K인 도시의 번호를 출력
 */

// input(int, int, int, int, array): 도시 개수(N), 도로 개수(M), 거리 정보(K), 출발 도시(X), 도로 정보(edges)
// output(string): 최단 거리 K인 도시 번호 리스트 출력, 없으면 -1 출력

const fs = require("fs");

function findSpecificDistanceCities(N, M, K, X, edges) {
  const graph = Array.from({ length: N + 1 }, () => []);
  const distance = Array(N + 1).fill(-1); // 거리 초기화

  edges.forEach(([A, B]) => {
    graph[A].push(B);
  });

  const queue = [X];
  distance[X] = 0;

  while (queue.length) {
    const current = queue.shift();
    if (graph[current]) {
      graph[current].forEach((next) => {
        if (distance[next] === -1) {
          // 방문하지 않은 도시
          distance[next] = distance[current] + 1;
          queue.push(next);
        }
      });
    }
  }

  const result = [];
  for (let i = 1; i <= N; i++) {
    if (distance[i] === K) {
      result.push(i);
    }
  }

  return result.length ? result.join("\n") : -1;
}

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "exam.txt")
  .toString()
  .split("\n");

const [N, M, K, X] = input[0].split(" ").map(Number);
const edges = input.slice(1, M + 1).map((line) => line.split(" ").map(Number));

console.log(findSpecificDistanceCities(N, M, K, X, edges));
