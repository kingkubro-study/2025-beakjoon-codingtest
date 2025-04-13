const filePath = process.platform === "linux" ? "/dev/stdin" : "./test.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

let [N, d, k, c] = input.shift().split(" ").map(Number);

let check = Array(d + 1).fill(0);
let sushi = Array(N).fill(0);

for (let i = 0; i < N; i++) {
  sushi[i] = Number(input.shift());
}

let cnt = 0;
let ans = 0;

for (let i = 0; i < k; i++) {
  if (check[sushi[i]] == 0) {
    cnt++;
  }

  check[sushi[i]]++;
}

ans = cnt;

for (let s = 0; s < N; s++) {
  let end = (s + k) % N;

  if (cnt >= ans) {
    if (check[c] == 0) {
      ans = cnt + 1;
    } else {
      ans = cnt;
    }
  }

  check[sushi[s]]--;
  if (check[sushi[s]] == 0) cnt--;
  if (check[sushi[end]] == 0) cnt++;

  check[sushi[end]]++;
}

console.log(ans);