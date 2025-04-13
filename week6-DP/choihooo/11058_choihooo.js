const input = require('fs').readFileSync('/dev/stdin').toString().trim();
const n = parseInt(input);
const dp = new Array(Math.max(7, n + 1)).fill(0);

for (let i = 1; i <= n; i++) {
    dp[i] = dp[i - 1] + 1;
    if (i > 6) {
        for (let j = 2; j < 5; j++) {
            dp[i] = Math.max(dp[i], dp[i - (j + 1)] * j);
        }
    }
}

console.log(dp[n]);
