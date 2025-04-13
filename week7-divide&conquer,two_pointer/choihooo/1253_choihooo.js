const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '/input.txt';
const inputs = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split('\n')
  .map((it) => it.split(' ').map(BigInt));
const n = Number(inputs[0][0]);
const A = inputs[1];

const map = new Map();

for (const a of A) {
  if (map.has(a)) map.set(a, map.get(a) + 1);
  else map.set(a, 1);
}

let ans = 0;
const bt = (selected, start) => {
  if (selected.length === 2) {
    const sum = selected[0] + selected[1];

    if (map.has(sum)) {
      if (sum === selected[0] && sum === selected[1] && map.get(sum) === 2)
        return;
      if (sum === selected[0] && map.get(sum) === 1) return;
      if (sum === selected[1] && map.get(sum) === 1) return;
      ans += map.get(sum);
      map.delete(sum);
    }
    return;
  }

  for (let i = start; i < n; i++) {
    bt([...selected, A[i]], i + 1);
  }
};

bt([], 0);

console.log(ans);