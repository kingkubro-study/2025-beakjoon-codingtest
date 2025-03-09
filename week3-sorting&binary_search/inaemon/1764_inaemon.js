/** 백준 1764: 듣보잡 (정렬/실버4)
 *
 * 듣지 못한 사람 N명 (중복 이름 x)
 * 보지 못한 사람 M명 (중복 이름 x)
 * 이름은 띄어쓰기 없이 알파벳 소문자이고 길이는 20이하
 * 
 * 듣보잡 수 출력하기
 * 듣보잡 명단을 사전 순으로 출력하기
 */

// input(int, int, int list, int list): 듣 N, 보 M, N명 명단, M명 명단
// output(int, int list): 듣보 수, 명단
function solution(N, M, dataList1, dataList2) {
    let answer = []; // 듣보잡 명단
    
    // 교집합 찾기
    dataList1.forEach(item => {
        if (dataList2.has(item)) {
            answer.push(item);
        }
    });
    
    // 정렬
    answer.sort();

    // 듣보잡 수 출력
    console.log(answer.length);

    // 듣보잡 명단 출력
    answer.forEach(item => {
        console.log(item);
    });
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let i = 0;

// 첫째 줄에서 입력한 값 (정수 2개: 듣지 못한 사람 N, 보지 못한 사람 M
const [N, M] = input[i++].split(' ').map(Number);

const dataList1 = new Set();
const dataList2 = new Set();

// N줄 입력
// 첫 번째 명단 집합에 N개의 입력 받기
for (let j = 0; j < N; j++) {
    dataList1.add(input[i++]);
}

// M줄 입력
// 두 번째 명단 집합에 M개의 입력 받기
for (let j = 0; j < M; j++) {
    dataList2.add(input[i++]);
}

// 출력
solution(N, M, dataList1, dataList2);