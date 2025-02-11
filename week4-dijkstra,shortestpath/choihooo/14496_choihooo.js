/**
 * 문자 치환을 통한 최소 치환 횟수 계산하기: 다익스트라 알고리즘 사용
 *
 * 연산1: 문자 간의 치환 가능 정보로 그래프의 인접 리스트 생성
 * 연산2: 우선순위 큐를 이용한 다익스트라 알고리즘으로 최소 치환 횟수 계산
 * 연산3: 출발 문자에서 도착 문자까지의 최소 치환 횟수 반환
 *
 * @param {number} start - 시작 문자 번호
 * @param {number} end - 목표 문자 번호
 * @return {number} - 시작 문자에서 목표 문자까지의 최소 치환 횟수, 불가능할 경우 -1
 */

function dijkstra(start, end) {
    const INF = Infinity;
    const dist = Array(N + 1).fill(INF);
    dist[start] = 0;
    const pq = [[0, start]]; // [cost, vertex]

    while (pq.length > 0) {
        pq.sort((a, b) => a[0] - b[0]); // 우선순위 큐를 배열로 구현
        const [cost, u] = pq.shift();

        if (dist[u] < cost) continue; // 이미 처리된 노드 스킵

        for (const [v, weight] of graph[u]) {
            const nextCost = cost + weight;
            if (dist[v] > nextCost) {
                dist[v] = nextCost;
                pq.push([nextCost, v]);
            }
        }
    }

    return dist[end] === INF ? -1 : dist[end];
}

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [A, B] = input[0].split(' ').map(Number);
const [N, M] = input[1].split(' ').map(Number);
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
    const [from, to] = input[i + 2].split(' ').map(Number);
    graph[from].push([to, 1]); // 비용은 모두 1로 동일
    graph[to].push([from, 1]); // 양방향 그래프
}

console.log(dijkstra(A, B)); // 결과 출력
