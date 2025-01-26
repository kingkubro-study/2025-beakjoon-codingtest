/** 백준 1260: DFS와 BFS (DFS& BFS/실버2)
 *
 * 연산1: 입력으로 인접 행렬 생성
 * 연산2: 인접 행렬로 DFS 수행
 * 연산3: 인접 행렬로 BFS 수행
 */

// input(int, int[], int): 정점의 개수, 간선 배열, 시작 정점
// output(int[], int[]): DFS 결과, BFS 결과

function solution(N, E, V) {
  let matrix = Array.from({ length: N }, () => Array(N).fill(0));
  let visited = Array(N).fill(false);
  let DFS = [];
  let BFS = [];

  // 연산 1: 인접 행렬 생성
  for (let [a, b] of E) {
    matrix[a - 1][b - 1] = 1;
    matrix[b - 1][a - 1] = 1; // 양방향 그래프 반영 이거 놓쳐서 한 번 틀렸음
  }

    // 연산 2: DFS 수행
    function dfs(V) {
        visited[V - 1] = true;
        DFS.push(V);
        for (let i = 0; i < N; i++) {
            if (matrix[V - 1][i] === 1 && !visited[i]) {
                dfs(i + 1);
            }
        }
    }

    // 연산 3: BFS 수행
    function bfs(V) {
        let queue = [V];
        let visited = Array(N).fill(false);
        visited[V - 1] = true;

        while (queue.length) {
            let current = queue.shift();
            BFS.push(current);
            for (let i = 0; i < N; i++) {
                if (matrix[current - 1][i] === 1 && !visited[i]) {
                    visited[i] = true;
                    queue.push(i + 1);
                }
            }
        }
    }

    // 시작 정점으로 DFS와 BFS 수행
    dfs(V);
    bfs(V);

    return [DFS, BFS].map(array => array.join(' ')).join('\n');
}

const input = require("fs").readFileSync("exam.txt").toString().split("\n");
// const input = require("fs").readFileSync("/dev/stdin").toString().split("\n");

let N = +input[0].split(" ")[0];
let M = +input[0].split(" ")[1];
let V = +input[0].split(" ")[2];

let E = [];

for (let index = 1; index <= M; index++) {
    E.push(input[index].split(" ").map(Number));
}

console.log(solution(N, E, V));
