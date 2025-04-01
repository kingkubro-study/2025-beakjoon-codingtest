/** 백준 11053: 가장 긴 증가하는 부분 수열 (DP/골드5)
 *
 * 수열 A에서 오름차순으로 요소 선택하되 가장 길게 만들기
 */

// 입력
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let idx = 0;
const N = parseInt(input[idx++]); // 수열 길이
const arr = input[idx++].split(" ").map(Number); // 원본 수열

// 출력
function solution() {
  // 수열 길이
  const answer = Array(N).fill(1); // DP 배열 1로 초기화

  // DP
  // 배열 모든 요소들 돌기 (next)
  for (let i = 1; i < N; i++) {
    // i 이전 요소들 돌기 (prev)
    for (let j = 0; j < i; j++) {
      // next value(i번째)가 더 큰 요소라면 선택
      if (arr[j] < arr[i]) {
        // i가 마지막 원소라고 했을 때,
        // 수열 길이 계산
        answer[i] = Math.max(answer[i], answer[j] + 1);
      }
    }
  }

  // 수열의 길이 중 가장 긴 값 출력
  const max = Math.max(...answer);
  console.log(max);
}

solution();
