const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

function countWaysToMakeChange(coins, m) {
  let dp = new Array(m + 1).fill(0);
  dp[0] = 1;

  for (let coin of coins) {
    for (let j = coin; j <= m; j++) {
      dp[j] += dp[j - coin];
    }
  }
  return dp[m];
}

function solve(input) {
  const T = +input[0];
  let index = 1;
  const result = [];

  for (let i = 0; i < T; i++) {
    const n = +input[index];
    const coins = input[index + 1].split(" ").map(Number);
    const m = +input[index + 2];

    result.push(countWaysToMakeChange(coins, m));
    index += 3;
  }

  console.log(result.join("\n"));
}

solve(input);