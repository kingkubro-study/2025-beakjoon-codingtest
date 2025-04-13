/**
 * 문제: 주어진 시작 교차로에서 목표 교차로까지 가는 경로 중,
 * 경로 상의 최대 요금을 최소화하여 지불할 금액을 최소화한다.
 *
 * 연산1: 교차로 간의 연결 정보와 각 연결의 통행료로 그래프의 인접 리스트 생성
 * 연산2: 이분 탐색과 BFS를 결합하여 각 교차로까지 가는데 필요한 최대 통행료의 최소값을 계산
 * 연산3: 출발 교차로에서 도착 교차로까지 갈 수 있는 최소의 최대 통행료를 반환
 *
 * @param {number} start - 출발 교차로 번호
 * @param {number} end - 도착 교차로 번호
 * @param {Array} graph - 교차로 간 연결과 통행료 정보를 담은 그래프
 * @param {number} N - 교차로의 총 개수
 * @return {number} - 출발 교차로에서 도착 교차로까지의 최소 가능 최대 통행료, 불가능할 경우 -1
 */

function canReach(start, end, maxCost, graph, N) {
  const visited = Array(N + 1).fill(false);
  const queue = [start];
  visited[start] = true;

  while (queue.length) {
    const current = queue.shift();
    if (current === end) {
      return true;
    }
    graph[current].forEach(([neighbor, cost]) => {
      if (!visited[neighbor] && cost <= maxCost) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    });
  }
  return false;
}

function solve(N, M, A, B, C, roads) {
  const graph = Array.from({ length: N + 1 }, () => []);
  roads.forEach(([u, v, cost]) => {
    graph[u].push([v, cost]);
    graph[v].push([u, cost]);
  });

  let left = 1,
    right = 1000,
    answer = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (canReach(A, B, mid, graph, N)) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return answer;
}

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().split("\n");
const [N, M, A, B, C] = input[0].split(" ").map(Number);
const roads = input.slice(1, M + 1).map((line) => line.split(" ").map(Number));

console.log(solve(N, M, A, B, C, roads));
