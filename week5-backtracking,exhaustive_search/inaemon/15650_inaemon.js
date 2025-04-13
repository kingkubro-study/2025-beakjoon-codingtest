/** 백준 15650: N과M(2) (백트래킹/실버3)
 *
 * 길이가 M인 수열 구하기
 * 1부터 N까지 자연수 중에서 중복 없이 M개의 수로 이루어진 수열
 * 오름차순 정렬
 */

// input(int, int, int): 자연수 최댓값, 수열 길이, 시작 자연수
// output(int list): 수열
let sequence = [];
function solution(N, M, start) {
  // 재귀 종료 조건: 길이가 M인 수열 완성
  if (sequence.length === M) {
    // 수열(배열)을 문자열로 바꿔서 출력
    console.log(sequence.join(" "));
    return;
  }

  // 수열 원소 찾기
  for (let i = start; i <= N; i++) {
    sequence.push(i); // 수열에 넣기 (부모 노드 방문)
    solution(N, M, i + 1); // 재귀 (자식 노드 방문)
    sequence.pop(); // 수열에서 제거
  }
}

// 입력
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let idx = 0;
// 첫째 줄에서 입력한 값 (정수 2개)
const [N, M] = input[idx++].split(" ").map(Number);

// 출력
solution(N, M, 1);
