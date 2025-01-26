class PrintQueue {
  constructor() {
    this.items = [];
    this.mark;
  }

  push(element) {
    this.items.push(element);
  }

  marking(number) {
    this.mark = number;
  }

  dequeue() {
    if (this.isEmpty()) {
      return;
    }
    return this.items.shift();
  }

  isEmpty() {
    return this.items.length === 0;
  }

  findMaxPriority() {
    return Math.max(...this.items.map((item) => item.priority));
  }

  processDocument() {
    let count = 0;
    while (!this.isEmpty()) {
      let current = this.dequeue();
      if (this.items.some((item) => item.priority > current.priority)) {
        this.push(current);
      } else {
        count++;
        if (current.mark) {
          return count;
        }
      }
    }
    return count;
  }
}

let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
// let input = require("fs").readFileSync("exam.txt").toString().split("\n");
const cnt = parseInt(input[0]);

let results = [];
let inputIndex = 1;

for (let i = 0; i < cnt; i++) {
  let [n, m] = input[inputIndex].split(" ").map(Number);
  let priorities = input[inputIndex + 1].split(" ").map(Number);
  let queue = new PrintQueue();

  for (let j = 0; j < n; j++) {
    queue.push({ priority: priorities[j], mark: j === m });
  }

  results.push(queue.processDocument());
  inputIndex += 2;
}

console.log(results.join("\n"));
