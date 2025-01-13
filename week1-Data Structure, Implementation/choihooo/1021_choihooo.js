class RotatingQueue {
  constructor(size) {
    this.queue = Array.from({ length: size }, (_, i) => i + 1);
    this.operationCount = 0;
  }

  rotateLeft() {
    this.queue.push(this.queue.shift());
    this.operationCount++;
  }

  rotateRight() {
    this.queue.unshift(this.queue.pop());
    this.operationCount++;
  }

  dequeue() {
    return this.queue.shift();
  }

  remove(target) {
    const targetIndex = this.queue.indexOf(target);
    const leftMoves = targetIndex;
    const rightMoves = this.queue.length - targetIndex;

    if (leftMoves <= rightMoves) {
      for (let i = 0; i < leftMoves; i++) {
        this.rotateLeft();
      }
    } else {
      for (let i = 0; i < rightMoves; i++) {
        this.rotateRight();
      }
    }

    this.dequeue();
  }

  getOperationCount() {
    return this.operationCount;
  }
}

function solveRotatingQueue(n, targets) {
  const rotatingQueue = new RotatingQueue(n);

  targets.forEach((target) => {
    rotatingQueue.remove(target);
  });

  return rotatingQueue.getOperationCount();
}

let input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
// let input = require("fs")
//   .readFileSync("exam.txt")
//   .toString()
//   .trim()
//   .split("\n");
const N = parseInt(input[0].split(" ")[0], 10);
const M = parseInt(input[0].split(" ")[1], 10);

const tmp = input[1].split(" ").map(Number);

const result = solveRotatingQueue(N, tmp);
console.log(result);
