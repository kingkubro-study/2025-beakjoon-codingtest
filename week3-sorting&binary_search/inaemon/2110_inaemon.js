/** 백준 2110: 공유기 설치 (이진 탐색/골드4)
 *
 * 공유기 C개 설치
 * 집 N개
 * 한 집엔 최대 공유기 1개 설치 가능
 * 가장 인접한 두 공유기 사이의 거리를 최대화하도록 집을 선택하여 공유기 설치
 */

// input(int, int, int list): 집 N개, 공유기 C개, 집 위치(중복x) 리스트
// output(int): 두 공유기 사이의 최대 거리
function solution(N, C, dataList) {
    let answer = 0; // 최대 거리
    let start = 0;  // 공유기 사이의 최소 거리
    let end = 0;    // 공유기 사이의 최대 거리
    
    // 집들의 위치 정렬
    dataList.sort((a, b) => a - b);

    // 초기 최소 거리는 1칸
    start = 1;
    // 초기 최대 거리는 막집 위치 - 첫집 위치
    end = dataList[N-1] - dataList[0];

    // 이진 탐색
    while (start <= end) {
      let mid = Math.floor((start + end) / 2); // 공유기 간 거리
      let current = dataList[0];  // 첫 번째 집 위치
      let count = 1;              // 첫 번째 집에 일단 공유기 설치

      // 공유기 설치 여부 확인 (첫 번째 집 제외)
      for (let i = 1; i < N; i++) {
          // 위치가 더 크면
          if (dataList[i] >= current + mid) {
            // 설치
            count++;
            current = dataList[i];
          }
      }

      // 공유기 설치 수가 C보다 크면
      if (count >= C) {
          start = mid + 1;  // 거리 늘리기
          answer = mid;     // 최적의 최소 거리 저장
      // 공유기 설치 수가 부족하면
      } else {
          end = mid - 1;    // 거리 줄이기
      }
    }

    return answer;
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let i = 0;

// 첫째 줄에서 입력한 값 (정수 2개: 집 N개, 공유기 C개)
const [N, C] = input[i++].split(' ').map(Number);

// 둘째 줄에서 입력한 값 (정수 N개: 집 위치 x좌표)
let dataList = [];
for (let j = 0; j < N; j++) {
    dataList.push(Number(input[i++]));
}

// 출력
console.log(solution(N, C, dataList));