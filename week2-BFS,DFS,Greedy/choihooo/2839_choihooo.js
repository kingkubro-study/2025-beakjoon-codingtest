/** 백준 2839: 설탕 배달 (그리디/실버4)
 *
 * 연산1: 전체를 5kg 봉지로 나눈다. 만약 정확하게 나누어 떨어지면, 해당 몫을 카운트하고 프로그램을 종료한다.
 * 연산2: 5kg 봉지로 정확히 나누어 떨어지지 않는 경우, 3kg 봉지 하나를 추가하고 전체 무게에서 3kg을 뺀다.
 * 연산3: 남은 무게가 0이 아닐 경우 위의 연산을 반복한다. 만약 더 이상 3kg 봉지로 나누어 떨어지지 않을 때 전체 무게가 0보다 작아진다면 -1을 출력한다.
 */

// input(int): 전체
// output(int): -1 아니면 카운트

function solution(N) {
  let count = 0; // 사용 봉지 수를 카운트할 변수

  while (N > 0) {
    if (N % 5 === 0) {
      // 연산 1
      count += N / 5;
      return count;
    }
    N -= 3; // 연산 2
    count++;
  }

  // 연산 3
  if (N < 0) {
    return -1;
  }
  return count;
}

// const input = require("fs").readFileSync("exam.txt").toString().trim();
const input = require("fs").readFileSync("/dev/stdin").toString().trim();
console.log(solution(parseInt(input)));
