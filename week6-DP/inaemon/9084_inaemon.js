/** 백준 9084: 동전 (DP/골드5)
 *
 * 1/5/10/50/100/500원
 * N가지 동전으로 금액 M을 만드는 경우의 수 구하기
 */

// 입력
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

// 첫째 줄에서 입력한 값 (정수 1개)
let idx = 0;
const T = parseInt(input[idx++]); // 테스트 케이스

/* // 런타임에러
for (let i = 0; i < T; i++) {
  solution();
}
*/

function solution() {
  for (let _ = 0; _ < T; _++) {
    const N = parseInt(input[idx++]); // 동전 종류 개수
    const coinTypes = input[idx++].split(" ").map(Number); // 동전 종류
    const price = parseInt(input[idx++]); // 만들어야 할 금액

    //const answer = Array({ length: price + 1 }).fill(0);  // 틀렸습니다
    const answer = Array(price + 1).fill(0);

    // 기본값
    answer[0] = 1; // 0원 만드는 방법 = 1가지

    // coinTypes 개수만큼 돌기
    for (let i = 0; i < N; i++) {
      // 동전 선택
      const coin = coinTypes[i];

      // DP
      for (let money = coin; money <= price; money++) {
        const c = money - coin;
        answer[money] += answer[c]; // money원 만드는 방법 개수
      }
    }

    // price원 만드는 방법 개수 출력
    console.log(answer[price]);
  }
}

solution();
