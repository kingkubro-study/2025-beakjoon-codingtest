/** 백준 2805: 나무 자르기 (이진 탐색/실버2)
 *
 * 나무의 높이: 20, 15, 10, 17
 * H가 15라면: 15, 15, 10, 15로 나무 높이가 바뀜
 * 잘린 부분 5, 2는 집에 가져감
 * 
 * 나무 총 M미터만큼 가져가기 위한 최소 H 구하기
 */

// input(int, int, int list): 나무 수 N, 가져갈 나무 길이 M, 나무 별 높이
// output(int): 최소 H
function solution(N, M, dataList) {
    let answer = 0; // 최소 H

    // 이진 탐색
    let start = 0;
    let end = Math.max(...dataList);    // 높이 중 최대

    while (start <= end) {
        // 가져갈 수 있는 나무 길이 (M을 만족하는 지 구하기)
        let m = 0;

        // 중간 위치, 소수점뜨면 반내림
        // 자를 위치로 지정하기
        const mid = Math.floor((start + end) / 2);

        // 모든 나무 탐색
        for(let i=0; i<N; i++) {
            // 중간 위치보다 큰 나무는
            if(dataList[i] > mid) {
                // 중간 위치로 자르고 남은 m만큼 가져갈 수 있다
                m += dataList[i] - mid;
            }
        }

        // 이진 탐색
        // 목표인 M을 달성하지 못 하면
        if (m < M) {
            end = mid - 1;      // 왼쪽으로 높이를 낮춰서 다시 탐색
        // 목표인 M을 달성하거나 초과했다면
        } else {
            answer = mid;       // 절단기 높이를 mid로 설정
            start = mid + 1;    // 오른쪽으로 높이를 높여서 다시 탐색
        }
    }
    
    return answer;
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let i = 0;

// 첫째 줄에서 입력한 값 (정수 2개: 나무 수 N, 가져갈 나무 길이 M)
const [N, M] = input[i++].split(' ').map(Number);

// 둘째 줄에서 입력한 값 (정수 N개: 나무 별 높이)
const dataList = input[i++].split(' ').map(Number);

// 출력
console.log(solution(N, M, dataList));