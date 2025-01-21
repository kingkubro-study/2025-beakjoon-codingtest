/** 백준 10815: 숫자 카드(탐색/실버5)
 *
 * 연산1: 입력 받은 배열을 정렬
 *
 * 연산2: 구분 해야할 카드(4째줄) 하나를 정렬한 배열에서 탐색
 *
 * input(int[], int[]):
 * - 상근이 카드 배열
 * - 구분 카드 배열
 *
 * output(int[]):
 * - 있는 카드 인덱스에 1로 반환한 배열
 */

function solution(N, M) {
  const result = [];

  // 연산1: 입력 받은 배열을 정렬
  function mergeSort(array) {
    if (array.length <= 1) return array;

    const middle = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, middle));
    const right = mergeSort(array.slice(middle));

    return merge(left, right);
  }

  function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    // 나머지 요소들을 결과 배열에 추가
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }

  N = mergeSort(N);

  // 연산2: 구분 해야할 카드(4째줄) 하나를 정렬한 배열에서 탐색
  function binarySearch(arr, target, start, end) {
    if (start > end) {
      return 0; // 타겟을 찾지 못했을 때
    }

    let mid = Math.floor((start + end) / 2); // 중간 위치 계산

    if (arr[mid] === target) {
      return 1; // 타겟을 찾은 경우
    } else if (arr[mid] > target) {
      return binarySearch(arr, target, start, mid - 1); // 왼쪽 하위 배열 탐색
    } else {
      return binarySearch(arr, target, mid + 1, end); // 오른쪽 하위 배열 탐색
    }
  }

  for (let index = 0; index < M.length; index++) {
    result[index] = binarySearch(N, M[index], 0, N.length - 1);
  }

  return result;
}

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "exam.txt")
  .toString()
  .split("\n");

const N = input[1].split(" ").map((item) => parseInt(item));
const M = input[3].split(" ").map((item) => parseInt(item));

console.log(solution(N, M).join(" "));
