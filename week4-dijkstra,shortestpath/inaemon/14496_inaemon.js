/** 백준 14496: 그대, 그머가 되어 (다익스트라/실버2)
 *
 * N개 문자, 치환 가능한 문자쌍 (x, y) M개
 *
 * 문자 A를 문자 B로 바꾸기 위한 최소 치환 횟수 구하기
 */
// input(int, int, int, int, int list):  시작노드, 종료노드, 문자개수, 문자쌍개수, 문자쌍정보
// output(int):  최소 비용
function solution(A, B, N, M, dataList) {
  let answer = 0; // 최단 거리 마지막에 바꿀거니깐 let으로 선언
  const INF = Infinity;

  // 엣지 정보: 노드개수+1만큼 초기화
  const edges = Array.from({ length: N + 1 }, () => []);
  for (let i = 0; i < dataList.length; i++) {
    const [a, b] = dataList[i];

    // 양방향
    edges[a].push([b, 1]); // 노드a -> 노드b,  거리 비용 1
    edges[b].push([a, 1]); // 노드b -> 노드a,  거리 비용 1
  }

  // 다익스트라 알고리즘
  const pq = []; // 다익스트라 알고리즘을 위한 우선순위 큐 (priority queue)
  const dist = Array(N + 1).fill(INF);
  dist[A] = 0; // 출발점(시작노드번호)은 거리값 0으로 초기화
  pq.push([dist[A], A]); // [거리, 노드]

  // 우선순위 큐에서 하나씩 꺼내면서 다익스트라 수행
  while (pq.length > 0) {
    // 우선순위 큐(최소 힙)을 이용하여 최단 경로 알고리즘 구현
    pq.sort((a, b) => a[0] - b[0]); // 오름차순 정렬:  최단거리(제일 작은 값)가 맨 앞으로 옴
    const [w1, u] = pq.shift(); // [거리, 노드] 꺼내기  // FIFO: 맨 앞에 온 최단거리 노드 꺼냄

    // dist[u]: 출발지로부터 노드 u 까지의 거리
    // w1: 현재 최단거리라고 꺼낸 노드 u 까지의 거리
    // dist[u]에 이미 w1보다 더 작은 거리값이 있다면 건너뛰기
    if (dist[u] < w1) continue;

    // 그래프 탐색: u와 연결된 모든 노드 탐색
    for (const [v, w2] of edges[u]) {
      // v까지의 최단 거리(비용) = u까지의 거리 + u와 v사이의 거리
      const cost = w1 + w2;

      // dist[v]에 더 큰 거리값(초기값 INF 포함)이 있다면
      if (dist[v] > cost) {
        // 최단 거리로 초기화
        dist[v] = cost;

        // 큐에 넣기
        pq.push([cost, v]); // 새로운 [거리, 노드]
      }
    }
  }

  // 도착점 B까지의 최단 거리
  answer = dist[B];

  if (answer === INF) return -1;

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

// 첫째 줄에서 입력한 값 (정수 2개: 문자 A, 문자 B)
const [A, B] = input[row++].split(" ").map(Number);

// 둘째 줄에서 입력한 값 (정수 2개: 문자 N개, 문자쌍 M개)
const [N, M] = input[row++].split(" ").map(Number);

// 문자쌍 M만큼 반복
const dataList = [];
for (let i = 0; i < M; i++) {
  const [a, b] = input[row++].split(" ").map(Number);
  dataList.push([a, b]);
}

// 출력
console.log(solution(A, B, N, M, dataList));
