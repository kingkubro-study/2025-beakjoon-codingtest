/**
 * 백준 1764: 듣보잡(정렬/실버4)
 *
 * 연산1: 보도 못한 사람의 명단을 Set 자료구조에 저장
 * 연산2: 듣도 못한 사람의 명단을 검색하여 교집합을 찾음
 *
 * input(string[], string[]):
 * - 보도 못한 사람의 명단 (listen)
 * - 듣도 못한 사람의 명단 (see)
 *
 * output():
 * - 듣도 보도 못한 사람의 명단을 출력
 */

function solution(listen, see) {
  // 보도 못한 사람의 명단을 Set에 저장하여 빠른 검색을 가능하게 함
  const listenSet = new Set(listen);
  const result = [];

  // 듣도 못한 사람의 명단을 순회하면서 보도 못한 사람의 명단과의 교집합을 찾음
  for (const name of see) {
    if (listenSet.has(name)) {
      result.push(name); // 교집합에 해당하는 이름을 결과 배열에 추가
    }
  }

  // 결과를 사전 순으로 정렬
  result.sort();
  
  console.log(result.length);
  result.forEach(name => console.log(name));
}

// 파일 입력 처리
const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "exam.txt")
  .toString()
  .trim().split("\n");

const N = +input[0].split(" ")[0];
const M = +input[0].split(" ")[1];

const listen = []; // 보도 못한 사람의 명단
const see = []; // 듣도 못한 사람의 명단

for (let i = 1; i <= N; i++) {
  listen.push(input[i]);
}
for (let i = N + 1; i < N + 1 + M; i++) {
  see.push(input[i]);
}

solution(listen, see);
