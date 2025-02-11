/**
 * 도시 간 최소 비용 계산하기: 다익스트라 알고리즘 사용
 *
 * 연산1: 도시 간의 버스 경로와 비용 정보로 그래프의 인접 리스트 생성
 * 연산2: 우선순위 큐를 이용한 다익스트라 알고리즘으로 최소 비용 계산
 * 연산3: 출발 도시에서 도착 도시까지의 최소 비용 반환
 *
 * @param {number} start - 출발 도시 번호
 * @param {number} end - 도착 도시 번호
 * @return {number} - 출발 도시에서 도착 도시까지의 최소 비용
 */
function dijkstra(start, end) {
  const costs = Array(N + 1).fill(Infinity);
  const priorityQueue = [{ node: start, cost: 0 }];
  costs[start] = 0;

  while (priorityQueue.length) {
    priorityQueue.sort((a, b) => a.cost - b.cost);
    const { node, cost } = priorityQueue.shift();

    if (cost > costs[node]) continue;

    for (const [to, nextCost] of graph[node]) {
      const totalCost = cost + nextCost;
      if (totalCost < costs[to]) {
        costs[to] = totalCost;
        priorityQueue.push({ node: to, cost: totalCost });
      }
    }
  }

  return costs[end];
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const graph = Array.from({ length: N + 1 }, () => new Map());

for (let i = 0; i < M; i++) {
  const [from, to, cost] = input[i + 2].split(" ").map(Number);
  if (graph[from].has(to)) {
    graph[from].set(to, Math.min(graph[from].get(to), cost));
  } else {
    graph[from].set(to, cost);
  }
}

const [start, end] = input[M + 2].split(" ").map(Number);

console.log(dijkstra(start, end));
