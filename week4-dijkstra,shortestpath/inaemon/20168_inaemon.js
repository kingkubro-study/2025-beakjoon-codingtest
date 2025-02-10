/** 백준 20168: 골목 대장 호석 - 기능성 (다익스트라/골드5)
 *
 * N개 교차로, M개 골목
 * 골목은 두 교차로(node)를 '양방향'으로 연결하는 edge (= cost이자 distance)
 * 골목 통과시 요금 부과
 * -> 가중치(weight)가 있는 양방향 edge
 *
 * 교차로 A에서 교차로 B까지 최소 요금 구하기
 */
// input(int, int, int, int, int, int list):  교차로 개수 N, 골목 개수 M, 시작 교차로 A, 도착 교차로 B, 가진 돈 C, 각 골목 정보
// output(int):  최소 요금
function solution(N, M, A, B, C, dataList) {
  let answer = 0; // 최단 거리 마지막에 바꿀거니깐 let으로 선언
  const INF = Infinity;
  const pq = []; // 다익스트라 알고리즘을 위한 우선순위 큐 (priority queue)

  // graph 초기화
  const graph = Array.from({ length: N + 1 }, () => []);

  // 비용 배열 초기화: INF로 채우기
  const cost = Array(N + 1).fill(INF);

  // 골목 정보 추가
  for (let i = 0; i < M; i++) {
    const [a, b, c] = dataList[i];
    //양방향이라 두 번 푸시
    graph[a].push([b, c]); // a -> b
    graph[b].push([a, c]); // b -> a
  }

  // 다익스트라 알고리즘
  cost[A] = 0; // 출발점(시작노드번호)은 비용 0으로 초기화
  pq.push([cost[A], A]); // [비용, 노드] 형태로 관리, [초기비용:0, 출발점:0]

  // 우선순위 큐에서 하나씩 꺼내면서 다익스트라 수행
  while (pq.length > 0) {
    // 우선순위 큐(최소 힙)을 이용하여 최단 경로 알고리즘 구현
    pq.sort((a, b) => a[0] - b[0]); // 오름차순 정렬:  최소비용(제일 작은 값)이 맨 앞으로 옴
    const [w1, u] = pq.shift(); // [비용, 노드] 꺼내기  // FIFO: 맨 앞에 온 최소비용 노드 꺼냄

    // cost[u]: 출발지로부터 노드 u 까지의 비용
    // w1: 현재 최소비용이라고 꺼낸 노드 u 까지의 비용
    // cost[u]에 이미 w1보다 더 작은 비용값이 있다면 건너뛰기
    if (cost[u] < w1) continue;

    // u는 이미 큐에서 꺼낸 노드고 목적지가 아니라서 cost[u]를 굳이 최소비용으로 초기화할 필요 ㄴㄴ
    // 현존 최소비용이 w1이라 v를 초기화하는 용도로 쓰고 버릴거
    //cost[u] = w1;

    // 그래프 탐색: u와 연결된 모든 노드 탐색
    for (const [v, w2] of graph[u]) {
      // v까지의 최소비용 = u까지의 비용 + u와 v사이의 비용
      const c = w1 + w2;

      // cost[v]에 더 큰 비용(초기값 INF 포함)이 있다면
      if (cost[v] > c) {
        // 최소비용으로 초기화
        cost[v] = c;

        // 큐에 넣기
        pq.push([c, v]); // 새로운 [거리, 노드]
      }
    }
  }

  // 도착점 B까지의 최소비용
  answer = cost[B];

  if (answer > C) return -1;

  return answer;
}

// 입력
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

// index는 계속 바꿔야하니깐 let으로 선언해야 함. const로 선언하면 런타임 에러 발생
let row = 0;

// 첫째 줄에서 입력한 값 (정수 5개: 교차로 개수 N, 골목 개수 M, 시작 교차로 A, 도착 교차로 B, 가진 돈 C)
const [N, M, A, B, C] = input[row++].split(" ").map(Number);

// 각 골목 정보
const dataList = [];
for (let i = 0; i < M; i++) {
  // 출발지 a, 도착지 b, 요금 c
  const [a, b, c] = input[row++].split(" ").map(Number);
  dataList.push([a, b, c]);
}

// 출력
console.log(solution(N, M, A, B, C, dataList));
