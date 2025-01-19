/** 백준 1260: DFS와 BFS (DFS & BFS/실버2)
 *
 * 입력: 접점, 간선, 시작 정점
 * 출력: DFS로 탐색한 결과와 BFS로 탐색한 결과 (V부터 방문된 점)
 */
// DFS 함수
function dfs(v, g, visited, result_dfs) {
    // 노드 v 방문
    visited[v] = true;

    // 방문 노드 배열에 추가
    result_dfs.push(v);

    // 현재 노드와 연결된 인접 노드 탐색
    for (let i of g[v]) {
        // 연결된 노드가 방문된 노드가 아니면 재귀 호출
        if (!visited[i]) {
            dfs(i, g, visited, result_dfs);
        }
    }
}

// BFS 함수
function bfs(v, g, visited, result_bfs) {
    let queue = [];

    // 노드 v를 큐에 추가
    queue.push(v);

    // 큐에 노드가 남아있는 동안 계속 탐색
    while (queue.length > 0) {
        // FIFO: 큐에서 가장 앞에 있는 노드를 꺼내기
        let current = queue.shift();

        // 방문하지 않은 노드면 방문
        if (!visited[current]) {
            visited[current] = true;

            // 방문 노드 배열에 추가
            result_bfs.push(current);
        }

        // 현재 노드와 연결된 인접 노드들을 큐에 넣기
        for (let i of g[current]) {
            if (!visited[i]) {
                queue.push(i);
            }
        }
    }
}


// input(int, int, int, int list): 정점 개수, 간선 개수, 시작 정점 번호, 간선 리스트 (정점 번호는 1번 ~ N번)
// output(string): 첫째줄은 BFS 탐색한 결과, 둘째줄은 BFS 탐색한 결과, 시작 정점 번호 V부터 방문된 점 출력
function solution(N, M, V, edges) {
    let answer = "";
    let g = [];
    let visited;

    // 그래프 초기화 (크기가 n+1인 2D 배열)
    for (let i = 0; i <= N; i++) {
        g[i] = [];
    }

    // 그래프에 간선 추가
    for (let [a, b] of edges) {
        g[a].push(b);
        g[b].push(a);
    }

    // 각 노드의 인접 리스트 정렬
    for (let i = 1; i <= N; i++) {
        g[i].sort((a, b) => a - b);
    }
    

    // DFS를 위해 방문 배열 초기화
    visited = Array(N + 1).fill(false);

    // DFS 탐색
    let result_dfs = [];
    dfs(V, g, visited, result_dfs);
    
    // BFS를 위해 방문 배열 초기화
    visited = Array(N + 1).fill(false); 

    // BFS 탐색
    let result_bfs = [];
    bfs(V, g, visited, result_bfs);

    // 최종 결과 반환
    answer = result_dfs.join(' ') + '\n' + result_bfs.join(' ');
    return answer;
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫째 줄에서 입력한 값 (정수 3개)
const [N, M, V] = input[0].split(' ').map(Number);

// 둘째 줄~에서 입력한 값 (정수 M개) 
const edges = input.slice(1).map(line => line.split(' ').map(Number));

// 출력
console.log(solution(N, M, V, edges));
