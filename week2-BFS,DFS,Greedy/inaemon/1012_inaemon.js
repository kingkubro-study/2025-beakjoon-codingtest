/** 백준 1012: 유기농 배추 (DFS & BFS/실버2)
 *
 * 유기농 배추 밭 행렬 (2D 배열)
 * 1: 배추가 심어진 땅
 * 0: 배추가 없는 땅
 * 
 * 현재 배추에서 상하좌우 4방향에 다른 배추가 위치한 경우 인접한 배추
 * 인접한 배추 사이에는 흰 지렁이가 이동 가능 (즉, 배추 뭉텅이 당 흰 지렁이 한 마리 필요)
 * 총 몇 마리의 흰 지렁이가 필요한 지 구하기
 */
function bfs(graph, x, y, N, M, visited) {
    const queue = [];

    // 방향 배열 (상, 하, 좌, 우)이자 (동, 서, 남, 북)
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    // 해당 위치를 큐에 추가
    queue.push([x, y]);

    // 해당 위치 방문 처리 (1 -> 0으로 바꿈)
    // x행 y열 -> 배열 접근시 [x][y]가 아니라 [y][x]인 거 주의!
    visited[y][x] = true;

    // 큐에 남은 좌표가 없을 때까지 돌기
    while (queue.length > 0) {
        // FIFO: 큐에서 가장 앞에 있는 좌표를 꺼내기
        const [curX, curY] = queue.shift();

        // 해당 좌표의 4방향 탐색 (해당 좌표의 인접 위치)
        for (let i = 0; i < 4; i++) {
            // 인접 위치
            const nx = curX + dx[i];    // nextX
            const ny = curY + dy[i];    // nextY
            
            // 유효한 범위 내에 있는 좌표인지 체크
            if (nx >= 0 && nx < M && ny >= 0 && ny < N) {
                // 배추가 심어져 있다면
                if(graph[ny][nx] === 1) {
                    // 미방문 지점(false)이면
                    if(visited[ny][nx] === false) {
                        // 방문하지 않은 인접 위치는 큐에 추가
                        queue.push([nx, ny]);
                        // 방문 처리
                        visited[ny][nx] = true;
                    }
                }
            }
        }
    }
}


// input(int, int, int list): 배추밭 행 M, 열 N, 배추가 심어진 위치 수 K, 배추가 심어진 위치 K개 (x, y) list
// output(int): 최소의 배추흰지렁이 마리 수
function solution(M, N, K, dataList) {
    let answer = 0;

    // 빈 배추밭 (M행 N열 모든 원소를 0으로 초기화)
    const graph = Array.from({ length: N }, () => Array(M).fill(0));

    // 방문 정보 초기화
    const visited = Array.from({ length: N }, () => Array(M).fill(false));
    
    // 배추밭에 배추 위치 데이터 넣기
    for (let i = 0; i < K; i++) {
        const [x, y] = dataList[i];

        // x행 y열 -> 배열 접근시 [x][y]가 아니라 [y][x]인 거 주의!
        graph[y][x] = 1;  // 배추가 있는 위치 표시 (배추 위치를 1로 설정)
    }

    // 배추밭 탐색
    for (let y = 0; y < N; y++) {
        for (let x = 0; x < M; x++) {
            // 배추가 있는 위치라면
            if (graph[y][x] === 1) {
                // 미방문 지역이라면
                if(!visited[y][x]){
                    // BFS 탐색: 해당 위치와 연결된 배추 방문
                    bfs(graph, x, y, N, M, visited);

                    // 흰 지렁이 추가
                    // 하나의 배추 뭉텅이(그룹)이당 흰 지렁이 한 마리 필요
                    answer++;
                }
            }
        }
    }

    // 배추 뭉텅이(그룹) 개수이자 흰 지렁이 개수 반환
    return answer;
}


// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫째 줄에서 입력한 값 (정수 1개)
let idx = 0;
const T = parseInt(input[idx++]);

// 테스트 케이스 T만큼 반복
for (let t = 0; t < T; t++) {
    // 각 테스트 케이스에 대해 M, N, K 입력 받기
    const [M, N, K] = input[idx++].split(' ').map(Number);

    // K개의 배추가 심어진 위치(x, y) 입력받기 (정수 2개씩 K줄)
    let dataList = [];
    for (let i = 0; i < K; i++) {
        const [x, y] = input[idx++].split(' ').map(Number);

        // 배추가 심어진 위치를 뒤집어서 리스트에 추가!!
        dataList.push([x, y]);
    }

    // 출력
    // 각 테스트 케이스에 대해 solution 함수 호출
    console.log(solution(M, N, K, dataList));
}