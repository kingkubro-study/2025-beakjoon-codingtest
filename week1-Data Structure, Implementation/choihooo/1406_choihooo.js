class Editor {
  constructor(initialText) {
    this.leftStack = initialText.split("");
    this.rightStack = [];
  }

  moveLeft() {
    if (this.leftStack.length > 0) {
      this.rightStack.push(this.leftStack.pop());
    }
  }

  moveRight() {
    if (this.rightStack.length > 0) {
      this.leftStack.push(this.rightStack.pop());
    }
  }

  insert(char) {
    this.leftStack.push(char);
  }

  delete() {
    if (this.leftStack.length > 0) {
      this.leftStack.pop();
    }
  }

  getResult() {
    return this.leftStack.join("") + this.rightStack.reverse().join("");
  }
}

let input = require("fs").readFileSync("/dev/stdin").toString().split("\n");
// let input = require("fs").readFileSync("exam.txt").toString().split("\n");
const initialText = input[0];
const number = parseInt(input[1]);
const commands = input.slice(2, 2 + number);

const editor = new Editor(initialText);

commands.forEach((command) => {
  switch (command[0]) {
    case "L":
      editor.moveLeft();
      break;
    case "D":
      editor.moveRight();
      break;
    case "P":
      editor.insert(command[2]);
      break;
    case "B":
      editor.delete();
      break;
  }
});

console.log(editor.getResult());
