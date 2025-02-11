/**
 * 지름길과 고속도로를 이용해 최소 거리 계산하기: 다익스트라 알고리즘 사용
 *
 * 연산1: 지름길과 고속도로 정보로 그래프의 인접 리스트 생성
 * 연산2: 우선순위 큐를 이용한 다익스트라 알고리즘으로 최소 거리 계산
 * 연산3: 최소 거리 배열에서 고속도로 길이 D까지의 최소 거리 반환
 *
 * @param {number} N - 지름길의 개수
 * @param {number} D - 고속도로의 총 길이
 * @param {Array} shortcuts - 각 지름길 정보를 담은 배열, 각 요소는 [시작 위치, 도착 위치, 지름길 길이]
 * @return {number} - 고속도로의 시작점에서 끝점까지의 최소 거리
 */
function solveShortestPath(N, D, shortcuts) {
  const inf = Infinity;
  const minDistance = Array(D + 1).fill(inf);
  minDistance[0] = 0;

  const adjList = Array.from({ length: D + 1 }, () => []);

  // 고속도로 각 지점을 다음 지점과 연결 (비용 1)
  for (let i = 0; i < D; i++) {
    adjList[i].push([i + 1, 1]);
  }

  // 지름길 추가
  shortcuts.forEach(([start, end, length]) => {
    if (end <= D) {
      adjList[start].push([end, length]);
    }
  });

  // 우선순위 큐 (거리가 작은 순으로 정렬)
  const pq = [{ node: 0, cost: 0 }];

  while (pq.length > 0) {
    pq.sort((a, b) => a.cost - b.cost); // 최소 힙 시뮬레이션
    const { node, cost } = pq.shift();

    if (cost > minDistance[node]) continue;

    adjList[node].forEach(([nextNode, nextCost]) => {
      const newCost = cost + nextCost;
      if (newCost < minDistance[nextNode]) {
        minDistance[nextNode] = newCost;
        pq.push({ node: nextNode, cost: newCost });
      }
    });
  }

  return minDistance[D];
}

const fs = require("fs");

const input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "exam.txt")
  .toString()
  .split("\n");

const [N, D] = input[0].split(" ").map(Number);
const shortcuts = input
  .slice(1, N + 1)
  .map((line) => line.split(" ").map(Number));

console.log(solveShortestPath(N, D, shortcuts));
