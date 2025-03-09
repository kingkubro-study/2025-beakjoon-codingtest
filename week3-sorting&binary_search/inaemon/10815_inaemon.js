/** 백준 10815: 숫자 카드 (이진 탐색/실버5)
 *
 * 숫자 카드 N개
 * 정수 M개
 * 정수가 적혀있는 카드를 갖고 있는 지 여부 구하기
 */

// 이진탐색
function binary(array, target) {
    let start = 0;
    let end = array.length - 1;
  
    let result = 0;
  
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
  
      if (array[mid] >= target) {
        end = mid - 1;
      } else if (array[mid] < target) {
        start = mid + 1;
      }
  
      if (array[mid] === target) {
        result += 1;
      }
    }

    return result;
}

// input(int, int, int list): 카드 수 N, 숫자 리스트 수 M, 카드 번호 리스트, 숫자 리스트
// output(int list): 각 카드 번호가 숫자 리스트에 속하는 지 여부
function solution(N, M, cardNumberList, numberList) {
    let answer = [];  // 갖고 있없

    // 정렬
    const sortedCardNumberList = cardNumberList.sort((a, b) => a - b);
    
    // 이진탐색
    numberList.forEach((num) => {
        answer.push(binary(sortedCardNumberList, num));
    });

    return answer.join(" ");
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let i = 0;

// 첫째 줄에서 입력한 값 (정수 1개: 숫자 카드 N개)
const N = parseInt(input[i++]);

// 둘째 줄에서 입력한 값 (정수 N개: 각 숫자 카드에 적힌 수)
const cardNumberList = input[i++].split(' ').map(Number);

// 셋째 줄에서 입력한 값 (정수 1개: 숫자 리스트 개수 M)
const M = parseInt(input[i++]);

// 넷째 줄에서 입력한 값 (정수 M개: 각 숫자 리스트에 적힌 수)
const numberList = input[i++].split(' ').map(Number);

// 출력
console.log(solution(N, M, cardNumberList, numberList));