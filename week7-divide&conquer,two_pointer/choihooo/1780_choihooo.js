const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const n = +input[0];
const paper = input.slice(1).map(v => v.split(" ").map(vv => +vv));

const countPaper = n => {
 const count = [0, 0, 0];
 
 const recursion = (n, x, y) => {
   const num = paper[y][x];
   let numCount = 0;
   
   outer: for (let i=0; i<n; i++) {
     for (let j=0; j<n; j++) {
       if (paper[y+j][x+i] === num) {
         numCount++;
       } else {
         numCount = 0;
         break outer;
       }
     }
   }
   
   if (numCount === n*n) {
     count[num+1]++;
   } else {
     n /= 3;
     for (let i=0; i<3; i++) {
       for (let j=0; j<3; j++) {
         recursion(n, x+i*n, y+j*n);
       }
     }
   }
 };
 
 recursion(n, 0, 0);
 
 console.log(count.join("\n"));
};

countPaper(n);