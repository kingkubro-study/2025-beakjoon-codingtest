/** 백준 2178: 미로탐색 (DFS & BFS/실버1)
 *
 * 미로 배열 (NxM)
 * 
 * 원소 1: 이동할 수 있는 칸
 * 원소 0: 이동할 수 없는 칸
 * 
 * 출발점: (1, 1)
 * 도착점: (N, M)
 * 
 * 한 칸에서 다른 칸으로 이동할 때 서로 인접한 칸으로만 이동
 * 지나야 하는 최소의 칸 수 구하기
 */
// BFS 함수
function bfs(N, M, graph, x, y) {
    // 상하좌우 방향
    let dx = [-1, 1, 0, 0];
    let dy = [0, 0, -1, 1];

    let queue = [];

    // 노드 [행, 열]를 큐에 추가
    queue.push([x, y]);

    // 큐에 노드가 남아있는 동안 계속 탐색
    while (queue.length > 0) {
        // FIFO: 큐에서 가장 앞에 있는 노드(좌표)를 꺼내기
        let [x, y] = queue.shift();

        // 현재 위치에서 상하좌우 4방향 탐색
        for (let i = 0; i < 4; i++) {
            let nx = x + dx[i];     // next_x
            let ny = y + dy[i];     // next_y
            
            // 유효한 범위 안에 있다면 (미로 N행 M열을 벗어나지 않은 좌표면)
            if (0 <= nx && nx < N && 0 <= ny && ny < M ) {
                // 벽(0)이 아니라 경로(1)가 있고, 방문한 적이 없다면
                if(graph[nx][ny] === 1){
                    // 큐에 추가
                    queue.push([nx, ny]);

                    // 해당 위치의 거리(이동횟수) 업뎃
                    graph[nx][ny] = graph[x][y] + 1;
                }
            }
        }
    }

    // 목적지 (N-1, M-1)의 최단 거리를 반환
    return graph[N - 1][M - 1];
}


// input(int, int, string list): 미로 행렬 크기 N(행), M(열), 각 행마다 원소값(1또는 0)을 붙여서 N행만큼
// output(int): 지나야하는 최소 칸
function solution(N, M, dataList) {
    // 2차원 미로 배열
    let graph = [];
    
    // 미로 배열 초기화: 데이터 넣기
    for (let i = 0; i < N; i++) {
        graph.push(dataList[i].split('').map(Number));  // string을 숫자로 변환
    }
    
    // BFS 함수 호출, 시작점(0, 0)부터 출발
    return bfs(N, M, graph, 0, 0);
}


// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫째 줄에서 입력한 값 (정수 2개)
const [N, M] = input[0].split(' ').map(Number);

// 둘째 줄~에서 입력한 값 (string N개) 
const dataList = input.slice(1, 1 + N);  // 첫 번째 줄 이후 n줄을 받기 위해 slice 사용

// 출력
console.log(solution(N, M, dataList));