class Stack {
  constructor() {
    this.items = [];
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isVSP() {
    return this.peek() === "(";
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

const checkParentheses = (str) => {
  const stack = new Stack();

  for (const char of str) {
    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      if (stack.isEmpty() || !stack.isVSP()) {
        return "NO";
      }
      stack.pop();
    }
  }

  return stack.isEmpty() ? "YES" : "NO";
};

let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
const results = [];
const count = parseInt(input[0], 10);

for (let i = 1; i <= count; i++) {
  results.push(checkParentheses(input[i]));
}

console.log(results.join("\n"));
