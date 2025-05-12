/** 백준 1253: 좋다 (투 포인터/골드4)
 *
 * 어떤 수 = 두개의 합 -> 좋은 수
 * 좋은 수 개수 구하기
 */
function solution(N, arr) {
  let answer = 0;

  // 편의를 위해 정렬
  //arr.sort(); // 문자열 정렬
  arr.sort((a, b) => a - b); // 숫자 정렬
  
  for (let i = 0; i < N; i++) {
    const tmp = arr.slice(0, i).concat(arr.slice(i + 1)); // arr[i] 제외 (다음과 같은 경우를 제거해야 함: arr[i] = arr[i] + 0)

    // 수 고정
    const n = arr[i];

    // 투포인터 알고리즘
    let left = 0;
    let right = tmp.length - 1;

    while(left < right) {
      const sum = tmp[left] + tmp[right];

      if(n === sum) {
        answer +=1;
        break;
      }else if(n > sum) {
        // sum 증가
        left += 1;
      }else {
        // sum 감소
        right -= 1;
      }
    }
  }

  return answer;
}

// 입력
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let idx = 0;
// 첫째 줄에서 입력한 값 (정수 1개)
const N = parseInt(input[idx++]);
// 둘째~줄에서 입력한 값 (배열 원소)
const arr = input[idx++].split(" ").map(Number);

// 출력
console.log(solution(N, arr));
