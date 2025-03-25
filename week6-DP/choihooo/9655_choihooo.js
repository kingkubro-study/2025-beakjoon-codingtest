const n = require("fs").readFileSync("/dev/stdin").toString().trim();

const N = +n;

const dp = (num) => {
  if (num === 1) return "SK";
  if (num === 2) return "CY";
  if (num === 3) return "SK";
  const memo = [0, 1, 2, 1];
  for (let i = 4; i <= num; i++) {
    memo[i] = Math.min(memo[i - 1] + 1, memo[i - 3] + 1);
  }
  return memo[num] % 2 === 0 ? "CY" : "SK";
};

console.log(dp(N));