const input = require('fs').readFileSync('/dev/stdin').toString().trim().split("\n");

const test_num = Number(input.shift());
const test_case = input.shift().split(" ").map(Number);

const dp = new Array(test_num);
dp[0] = 1;

for (let i = 1; i < test_num; i++) {
  let max = 0;
  for (let j = 0; j < i; j++) {
    if (test_case[j] < test_case[i]) {
      max = Math.max(max, dp[j]);
    }
  }
  dp[i] = max + 1;
}

console.log(Math.max(...dp));