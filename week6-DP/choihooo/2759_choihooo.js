const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
const T = parseInt(input[0]);

for (let t = 1; t <= T; t++) {
    const arr = input[t].split(' ').map(Number);
    const N = arr[0];
    let pancakes = arr.slice(1);

    const flips = [];

    for (let size = N; size > 1; size--) {
        const target = size;
        const targetIndex = pancakes.indexOf(target);

        if (targetIndex === size - 1) {
            continue;
        }

        if (targetIndex !== 0) {
            flips.push(targetIndex + 1);
            pancakes = reverse(pancakes, targetIndex);
        }

        flips.push(size);
        pancakes = reverse(pancakes, size - 1);
    }

    console.log(flips.length + ' ' + flips.join(' '));
}

function reverse(arr, k) {
    let i = 0;
    let j = k;
    while (i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
    }
    return arr;
}
