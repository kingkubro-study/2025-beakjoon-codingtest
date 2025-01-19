/** 백준 1269: 대칭 차집합 (해시맵/실버4)
 *
 * 두 집합 A, B
 * 자연수 원소
 * A와 B의 대칭 차집함은 (A-B)와 (B-A)의 합집합
 * 
 * 예시
 *  A = { 1, 2, 4 }
 *  B = { 2, 3, 4, 5, 6 }
 *  A-B = { 1 }
 *  B-A = { 3, 5, 6 }
 *  대칭 차집합의 원소의 개수는 1 + 3 = 4개
 */

// input(int list, int list): A집합 원소, B집합 원소
// output(int): 대칭 차집합의 원소의 개수
function solution(dataList1, dataList2) {
    let answer = 0; // 대칭 차집합의 원소의 개수

    // dataList1과 dataList2를 Set으로 변환
    const set1 = new Set(dataList1);
    const set2 = new Set(dataList2);
    
    // S_a에서 S_b에 없는 값과 S_b에서 S_a에 없는 값을 합산
    const diffList1 = [...set1].filter(x => !set2.has(x));
    const diffList2 = [...set2].filter(x => !set1.has(x));

    answer = diffList1.length + diffList2.length;

    return answer;

}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫째 줄에서 입력한 값 (정수 2개)
// A집합 원소 개수, B집합 원소 개수
const [N, M] = input[0].split(' ').map(Number);

// 두번째 줄에서 입력한 값 (정수 N개)
const dataList1 = input[1].split(' ').map(Number);

// 세번째 줄에서 입력한 값 (정수 M개)
const dataList2 = input[2].split(' ').map(Number);

// 출력
console.log(solution(dataList1, dataList2));
