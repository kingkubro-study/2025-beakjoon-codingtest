/** 백준 7569: 토마토 (DFS & BFS/골드5)
 * 
 * 토마토 상자 H층만큼
 * 토마토 위/아래/왼/오/앞/뒤 6방향이 인접한 토마토
 * -> 1012, 2178의 3D version이네
 * 
 * 하루가 지나면 익은 토마토의 인접 토마토들이 익음
 * 모든 토마토가 익기 위한 최소 일수 구하기
 */

// 메모리: 150280KB,	시간: 784ms
class Tomato {
    constructor(x, y, z, day) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.day = day;
    }
}

function bfs(M, N, H, matrix, visited) {
    // 인접(왼,오,위,아래,앞,뒤) 6 방향
    const dx = [-1, 1, 0, 0, 0, 0];
    const dy = [0, 0, -1, 1, 0, 0];
    const dz = [0, 0, 0, 0, -1, 1];

    let queue = [];
    let remainCnt = 0;  // 안 익은 토마토 수
    let day = 0;        // 다 익을 때까지 지난 날짜

    // 큐 초기화: 익은 토마토를 모두 넣기
    // 1인(토마토가 있는) 좌표들 값 넣기
    for (let z = 0; z < H; z++) {
        for (let y = 0; y < N; y++) {
            for (let x = 0; x < M; x++) {
                if (matrix[z][y][x] === 1) {
                    const tomato = new Tomato(x, y, z, 0);
                    queue.push(tomato);  // 익은 토마토의 좌표를 큐에 넣음
                    visited[z][y][x] = true;

                } else if (matrix[z][y][x] === 0) {
                    remainCnt++;
                }
            }
        }
    }

    // 큐에 쌓인 게 없을 때까지 돌기
    let index = 0;
    while (queue.length > index) {
        // FIFO: 큐에서 맨 앞 원소 꺼내기
        const currentTomato = queue[index++];

        // 인접한 6방향에 대해 탐색
        for (let i = 0; i < 6; i++) {
            // x, y, z + 인접한 방향으로 1칸 이동
            const nx = currentTomato.x + dx[i];
            const ny = currentTomato.y + dy[i];
            const nz = currentTomato.z + dz[i];

            // 토마토 상자 범위 밖으로 벗어나는 좌표인지 필터링
            if (nx < 0 || nx >= M || ny < 0 || ny >= N || nz < 0 || nz >= H) {
                continue;
            }

            // 토마토가 안 익었으면
            if (matrix[nz][ny][nx] === 0) {
                // 방문하지 않은 위치라면 
                if(!visited[nz][ny][nx]) {
                    // currentTomato의 인접 토마토, 날짜 하루 지나도록 갱신
                    const tomato = new Tomato(nx, ny, nz, currentTomato.day+1);
                    // 큐에 넣기
                    queue.push(tomato);
                    // 익은 토마토로 변함
                    matrix[nz][ny][nx] = 1;
                    // 안 익은 토마토 취소
                    remainCnt--;
                    // 방문
                    visited[nz][ny][nx] = true;
                }
            }
        }

        day = currentTomato.day;
    }

    // 남은 토마토가 없으면 지난 날짜 반환 
    if(remainCnt == 0)
        return day;
    else
        return -1;
}

// input(int, int, int, int list): 토마토 상자 행, 열, 높이, 토마토 정보(0:안 익음, 1:익음, -1:토마토가 없는 칸) 리스트
// output(int): 모든 토마토가 익을 때까지 걸리는 최소 일수 (모든 토마토가 익은 상태면 0, 익지 못 하면 -1)
function solution(M, N, H, matrix) {
    let answer = 0;
    
    // 방문 배열 초기화: MxNxH만큼 false로 채우기
    let visited = Array.from({ length: H }, () => 
        Array.from({ length: N }, () => Array(M).fill(false))
    );

    // BFS 탐색
    // 인접 토마토 방문이 필요하므로 BFS로 접근하기
    answer = bfs(M, N, H, matrix, visited);

    return answer;
}


// 입력
//테스트용: __dirname + '/input.txt'
//제출용: '/dev/stdin'
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let idx = 0;

// 첫째 줄에서 입력한 값 (정수 3개)
const [M, N, H] = input[idx++].split(' ').map(Number);   // 3D 배열 크기: 상자 크기 MxN, 상자 수 H


// 상자 별로 원소(토마토) 정보
let matrix = [];
for (let h = 0; h < H; h++) {
    let layer = [];
    for (let n = 0; n < N; n++) {
        let m = input[idx++].split(' ').map(Number);
        layer.push(m);
    }
    matrix.push(layer);

}

// 출력
console.log(solution(M, N, H, matrix));



/////////////////////////////////////////////////////////
/// 시간 초과
/*
function bfs(M, N, H, matrix, visited) {
    // 인접(왼,오,위,아래,앞,뒤) 6 방향
    const dx = [-1, 1, 0, 0, 0, 0];
    const dy = [0, 0, -1, 1, 0, 0];
    const dz = [0, 0, 0, 0, -1, 1];

    let queue = [];

    // 큐 초기화: 익은 토마토를 모두 넣기
    // 1인(토마토가 있는) 좌표들 값 넣기
    for (let z = 0; z < H; z++) {
        for (let y = 0; y < N; y++) {
            for (let x = 0; x < M; x++) {
                if (matrix[z][y][x] === 1) {
                    queue.push([x, y, z]);  // 익은 토마토의 좌표를 큐에 넣음
                    visited[z][y][x] = true;
                }
            }
        }
    }

    // 큐에 쌓인 게 없을 때까지 돌기
    while (queue.length > 0) {
        // FIFO: 큐에서 맨 앞 원소 꺼내기
        // shift()가 시간 초과 원인??
        const [x, y, z] = queue.shift();

        // 인접한 6방향에 대해 탐색
        for (let i = 0; i < 6; i++) {
            // x, y, z + 인접한 방향으로 1칸 이동
            const nx = x + dx[i];
            const ny = y + dy[i];
            const nz = z + dz[i];

            // 토마토 상자 범위 밖으로 벗어나는 좌표인지 필터링
            if (nx < 0 || nx >= M || ny < 0 || ny >= N || nz < 0 || nz >= H) {
                continue;
            }

            // 토마토가 안 익었으면
            if (matrix[nz][ny][nx] === 0) {
                // 방문하지 않은 위치라면 
                if(!visited[nz][ny][nx]) {
                    // 큐에 넣기
                    queue.push([nx, ny, nz]);
                    // 익은 날짜 갱신
                    matrix[nz][ny][nx] = matrix[z][y][x] + 1;
                    // 방문
                    visited[nz][ny][nx] = true;
                }
            }
        }
    }
}

// input(int, int, int, int list): 토마토 상자 행, 열, 높이, 토마토 정보(0:안 익음, 1:익음, -1:토마토가 없는 칸) 리스트
// output(int): 모든 토마토가 익을 때까지 걸리는 최소 일수 (모든 토마토가 익은 상태면 0, 익지 못 하면 -1)
function solution(M, N, H, matrix) {
    let answer = 0;
    
    // 방문 배열 초기화: MxNxH만큼 false로 채우기
    let visited = Array.from({ length: H }, () => 
        Array.from({ length: N }, () => Array(M).fill(false))
    );

    // BFS 탐색
    // 인접 토마토 방문이 필요하므로 BFS로 접근하기
    bfs(M, N, H, matrix, visited);

    // 익지 않은 토마토가 있는지 확인
    for (let i = 0; i < H; i++) {
        for (let j = 0; j < N; j++) {
            for (let k = 0; k < M; k++) {
                if (box[i][j][k] === 0) {
                    // 하나라도 익지 않은 토마토가 있으면 -1 출력
                    answer = -1;
                    return answer;
                }
                answer = Math.max(answer, matrix[i][j][k]);
            }
        }
    }
    
    answer = answer - 1;

    return answer;
}


// 입력
//테스트용: __dirname + '/input.txt'
//제출용: '/dev/stdin'
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let idx = 0;

// 첫째 줄에서 입력한 값 (정수 3개)
const [M, N, H] = input[idx++].split(' ').map(Number);   // 3D 배열 크기: 상자 크기 MxN, 상자 수 H


// 상자 별로 원소(토마토) 정보
let matrix = [];
for (let h = 0; h < H; h++) {
    let layer = [];
    for (let m = 0; m < M; m++) {
        let n = input[idx++].split(' ').map(Number);
        layer.push(n);
    }
    matrix.push(layer);

}

// 출력
console.log(solution(M, N, H, matrix));
*/