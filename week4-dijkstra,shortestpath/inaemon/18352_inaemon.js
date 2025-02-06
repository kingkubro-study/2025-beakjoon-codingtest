/** 백준 18352: 특정 거리의 도시 찾기 (다익스트라/실버2)
 *
 * N개 도시, M개 도로
 * 각 도로의 거리는 1
 * 각 도시에서 자기자신 도시까지의 최단 거리는 0
 * 
 * 도시 X부터 출발했을 때, 최단 거리가 K인 모든 도시들 번호 출력
 */

/** 풀이1: BFS (메모리 299104 KB,  시간 5140 ms) */
// input(int, int, int, int list): // 도시 개수, 도로 개수, 도달 거리, 출발 도시, 도로 정보 리스트
// output(int):  출발 도시 X로부터 최단 거리가 K인 도시 리스트
function solution(N, M, K, X, dataList) {
    const answer = [];

    const graph = Array.from({ length: N + 1 }, () => []);  // 도시 연결 정보
    const distance = Array(N + 1).fill(0);      // 거리 체크
    const visit = Array(N + 1).fill(false);     // 방문 체크

    const queue = [X];
    
    // 도로 정보에서 출발지, 목적지 가져오기
    for (const [A, B] of dataList) {
        graph[A].push(B);
    }

    // X 방문
    visit[X] = true;

    // 다익스트라
    while (queue.length > 0) {
        // FIFO: A 꺼내기
        const current = queue.shift();

        // A에 대한 B들을 돌기
        for (const next of graph[current]) {
            if (!visit[next]) {
                // 방문
                queue.push(next);
                visit[next] = true;
                distance[next] = distance[current] + 1;  // 거리 계산

                // 원하는 거리를 찾았을 경우
                if (distance[next] === K) {
                    // 답에 넣기
                    answer.push(next);
                }
            }
        }
    }

    // 결과 출력
    if (answer.length === 0) {
        console.log(-1);
    } else {
        // 오름차순 정렬
        answer.sort((a, b) => a - b);
        answer.forEach(Y => console.log(Y));
    }
}


// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let idx = 0;

// 첫째 줄에서 입력한 값 (정수 4개)
const [N, M, K, X] = input[idx++].split(' ').map(Number);   // 도시 개수, 도로 개수, 도달 거리, 출발 도시

let dataList = [];

// 도로 M만큼 반복
for (let m = 0; m < M; m++) {
    // 도시 A, 도시 B를 이은 도로
    const [A, B] = input[idx++].split(' ').map(Number);
    dataList.push([A, B]);
}

// 출력
solution(N, M, K, X, dataList);




/** 풀이2: 다익스트라 (메모리  KB,  시간  ms) */
