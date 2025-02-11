/**
 * 가중치 없는 방향 그래프에서 모든 정점 쌍 (i, j) 사이의 경로 존재 여부 확인
 *
 * 연산1: 그래프의 인접 행렬로 표현된 정보를 사용하여 초기 그래프 구성
 * 연산2: 플로이드-워셜 알고리즘을 이용하여 모든 정점 쌍의 경로 존재 여부 계산
 * 연산3: 계산된 경로 존재 여부를 인접 행렬 형식으로 출력
 *
 */

const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const N = parseInt(input[0]);
const graph = Array.from({length: N}, (_, i) => input[i + 1].split(' ').map(Number));

// 플로이드-워셜 알고리즘으로 모든 쌍 최단 경로 존재 여부 확인
for (let k = 0; k < N; k++) {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (graph[i][k] === 1 && graph[k][j] === 1) {
                graph[i][j] = 1;
            }
        }
    }
}

// 결과를 문자열로 변환하여 출력
const result = graph.map(row => row.join(' ')).join('\n');
console.log(result);
