/** 백준 13335: 트럭 (큐/실버1)
 *
 * <다리>
 * 총 N개 트럭 건넌다
 * 최대 W개 트럭이 동시에 올라갈 수 있음 (다리 길이라고 하자)
 * 최대 L kg만큼 올라갈 수 있음 (동시에 올라간 트럭의 무게가 L보다 작거나 같아야 함)
 * 
 * <트럭>
 * 처음 주어진 트럭 리스트의 순서 변경 불가
 * 
 * 모든 트럭이 다리를 건너는 최단시간 구하기
 */


// input(int, int, int, int list): 트럭수, 다리 길이, 다리 최대하중, 트럭 무게 리스트
// output(int): 시간
function solution(N, W, L, kg_list) {
  // 최단시간
  let answer = 0;

  // 큐 초기화: 최대 트럭수(다리 길이) W만큼 0으로
  const queue = Array(W).fill(0);

  // 모든 트럭이 건널 때까지
  let n = 0;
  while (n < N) {
      // 트럭이 건너는 중
      answer += 1;      // 1초 증가
      queue.shift();  // 다리 위 트럭 제거

      // 다리 위에 올라간 트럭 무게 구하기
      const sum = queue.reduce((a, b) => a + b, 0);
      
      // 새로운 트럭이 다리에 올라갈 수 있니
      if (sum + kg_list[n] <= L) {
        // 다리 위에 트럭 추가
        queue.push(kg_list[n]);
        n++;

      } else {
        // Lkg 초과!!
        // 트럭 제거? (X)
        // 트럭 다 건널떄까지 기달? (O)
        // 다리 위에 더 이상 못 올라감 -> 0 추가해서 큐 채우기
        queue.push(0);
      }
  }
  
  // 큐 마무리 필수
  // 다리에 남은 트럭 다 빼내기
  while (queue.length > 0) {
      answer += 1;      // 1초 증가
      queue.shift();  // 다리 위 트럭 제거
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
// 첫째 줄에서 입력한 값 (정수 3개)
// N: 트럭수, W: 다리 길이, L: 다리 최대하중
const [N, W, L] = input[idx++].split(" ").map(Number);

// 둘째 줄에서 입력한 값 (정수 리스트)
// 각 트럭 무게
const kg_list = input[idx++].split(" ").map(Number);

// 출력
console.log(solution(N, W, L, kg_list));
