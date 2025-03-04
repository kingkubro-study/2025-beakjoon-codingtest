/** 백준 1446: 지름길 (최단 경로/실버1)
 *
 * D킬로미터 고속도로에 지름길 존재
 * 일방통행 지름길 (= 방향 그래프)
 * 운전할 최소 거리 구하기
 */
// input(int, int, int list):  지름길 개수, 고속도로 길이, 지름길 정보(시작위치/도착위치/길이)
// output(int):  최소 거리
function solution(N, D, dataList) {
    let answer = 0;         // 최단 거리 마지막에 바꿀거니깐 let으로 선언 ㅠㅠ
    const INF = Infinity;
    const pq = [];          // 다익스트라 알고리즘을 위한 우선순위 큐 (priority queue)
    const startNode = 0;    // 출발점(시작노드번호)
    
    // graph 초기화: 1 x (D+1) 크기의 행렬
    const graph = Array.from({ length: D + 1 }, () => []);

    // 거리 배열 초기화: INF로 채우기
    const dist = Array(D + 1).fill(INF);
    
    // 도로 거리 초기화: 기본값 1로 채우기
    for (let i=startNode; i<D+1; i++) {
        // i-th 노드에서 i+1-th 노드로 가는 거리를 1로 초기화
        graph[i].push([i+1, 1]);
    }

    // 지름길 거리 정보 추가
    for (let i=0; i<N; i++) {
        // 지름길 정보
        const [start, end, len] = dataList[i];
        
        // start-th 노드에서 end-th 노드로 가는 거리를 len으로 초기화
        if (end <= D) {
            graph[start].push([end, len]);
        }
    }


    // 다익스트라 알고리즘
    dist[startNode] = 0;                     // 출발점(시작노드번호)은 거리값 0으로 초기화
    pq.push([dist[startNode], startNode]);   // [거리, 노드] 형태로 관리, [출발거리:0, 출발점:0]
    
    // 우선순위 큐에서 하나씩 꺼내면서 다익스트라 수행
    while (pq.length > 0) {
        // 우선순위 큐(최소 힙)을 이용하여 최단 경로 알고리즘 구현
        pq.sort((a, b) => a[0] - b[0]);     // 오름차순 정렬:  최단거리(제일 작은 값)가 맨 앞으로 옴
        const [w1, u] = pq.shift();         // [거리, 노드] 꺼내기  // FIFO: 맨 앞에 온 최단거리 노드 꺼냄

        // dist[u]: 출발지로부터 노드 u 까지의 거리
        // w1: 현재 최단거리라고 꺼낸 노드 u 까지의 거리
        // dist[u]에 이미 w1보다 더 작은 거리값이 있다면 건너뛰기
        if (dist[u] < w1)
            continue;

        // u는 이미 큐에서 꺼낸 노드고 목적지가 아니라서 dist[u]를 굳이 최단거리로 초기화할 필요 ㄴㄴ
        // 현존 최단 거리가 w1이라 v를 초기화하는 용도로 쓰고 버릴거
        //dist[u] = w1;

        // 그래프 탐색: u와 연결된 모든 노드 탐색
        for (const [v, w2] of graph[u]) {
            // v까지의 최단 거리(비용) = u까지의 거리 + u와 v사이의 거리
            //const cost = dist[u] + w2;
            const cost = w1 + w2;       // 현재 u까지의 최단거리라고 큐에서 꺼낸 건 w1임

            // dist[v]에 더 큰 거리값(초기값 INF 포함)이 있다면
            if (dist[v] > cost) {
                // 최단 거리로 초기화
                dist[v] = cost;

                // 큐에 넣기
                pq.push([cost, v]);  // 새로운 [거리, 노드]
            }
        }
    }

    // 도착점 D까지의 최단 거리
    answer = dist[D];

    return answer;
}


// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// index는 계속 바꿔야하니깐 let으로 선언해야 함. const로 선언하면 런타임 에러 발생
let row = 0;

// 첫째 줄에서 입력한 값 (정수 2개: 지름길 개수 N, 고속도로 길이 D)
const [N, D] = input[row++].split(' ').map(Number);

const dataList = [];

// 지름길 N만큼 반복
for (let i = 0; i < N; i++) {   // 행
    // 시작위치, 도착위치, 지름길 길이
    const [S, E, L] = input[row++].split(' ').map(Number);
    dataList.push([S, E, L]);
}

// 출력
console.log(solution(N, D, dataList));