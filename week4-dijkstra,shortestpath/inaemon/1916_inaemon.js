/** 백준 1916: 최소 비용 구하기 (최단 경로/골드5)
 *
 * N개 도시, M개 버스
 * 각 버스는 출발지 도시A, 목적지 도시B, 버스비용 정보를 가짐
 *
 * 도시A에서 도시B로 가기 위한 최소 비용 구하기
 */
// input(int, int, int list, int, int):  도시 개수, 버스 개수, 버스 정보(시작위치/도착위치/비용), 최초출발지, 최종목적지
// output(int):  최소 비용
function solution(N, M, dataList, S, E) {
  let answer = 0; // 최소 비용 마지막에 바꿀거니깐 let으로 선언
  const INF = Infinity;
  const pq = []; // 다익스트라 알고리즘을 위한 우선순위 큐 (priority queue)
  const startNode = S; // 출발점(시작노드번호)

  // graph 초기화: 1 x (M+1) 크기의 행렬
  const graph = Array.from({ length: N + 1 }, () => []);

  // 비용 배열 초기화: INF로 채우기
  const cost = Array(N + 1).fill(INF);

  // 버스 정보 추가
  for (let i = 0; i < M; i++) {
    // 버스 정보
    const [depart, dest, c] = dataList[i];

    // depart-th 노드에서 dest-th 노드로 가는 비용을 c로 초기화
    graph[depart].push([dest, c]);
  }

  // 다익스트라 알고리즘
  cost[startNode] = 0; // 출발점(시작노드번호)은 비용 0에서 시작
  pq.push([cost[startNode], startNode]); // [비용, 노드] 형태로 관리, [초기비용:0, 출발도시:0]

  // 우선순위 큐에서 하나씩 꺼내면서 다익스트라 수행
  while (pq.length > 0) {
    // 우선순위 큐(최소 힙)을 이용하여 최단 경로 알고리즘 구현
    pq.sort((a, b) => a[0] - b[0]); // 오름차순 정렬:  최단거리(제일 작은 값)가 맨 앞으로 옴
    const [w1, u] = pq.shift(); // [비용, 노드] 꺼내기  // FIFO: 맨 앞에 온 최소비용 노드 꺼냄

    // cost[u]: 출발지로부터 노드 u 까지의 비용
    // w1: 현재 최소비용이라고 꺼낸 노드 u 까지의 비용
    // cost[u]에 이미 w1보다 더 작은 비용이 있다면 건너뛰기
    if (cost[u] < w1) continue;

    // u는 이미 큐에서 꺼낸 노드고 목적지가 아니라서 cost[u]를 굳이 최소비용으로 초기화할 필요 ㄴㄴ
    // 현존 최소 비용이 w1이라 v를 초기화하는 용도로 쓰고 버릴거
    //cost[u] = w1;

    // 그래프 탐색: u와 연결된 모든 노드 탐색
    for (const [v, w2] of graph[u]) {
      // v까지의 최소 비용 = u까지의 비용 + u와 v사이의 비용
      const c = w1 + w2; // 현재 u까지의 최소비용이라고 큐에서 꺼낸 건 cost[u]가 아닌 w1임

      // cost[v]에 더 큰 비용(초기값 INF 포함)이 있다면
      if (cost[v] > c) {
        // 최소 비용으로 초기화
        cost[v] = c;

        // 큐에 넣기
        pq.push([c, v]); // 새로운 [비용, 노드]
      }
    }
  }

  // 도착점 E까지의 최소 비용
  answer = cost[E];

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

// 첫째 줄에서 입력한 값 (정수 1개: 도시 개수 N)
const N = parseInt(input[row++]);

// 둘째 줄에서 입력한 값 (정수 1개: 버스 개수 M)
const M = parseInt(input[row++]);

const dataList = [];

// 버스 M만큼 반복
for (let i = 0; i < M; i++) {
  // 행
  // 출발도시, 도착도시, 버스비용
  const [departure, destination, cost] = input[row++].split(" ").map(Number);
  dataList.push([departure, destination, cost]);
}

// 마지막 줄에서 입력한 값 (정수 2개: 출발도시, 목적도시)
const [S, E] = input[row++].split(" ").map(Number);

// 출력
console.log(solution(N, M, dataList, S, E));
