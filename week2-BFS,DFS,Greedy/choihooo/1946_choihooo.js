/**
 * 백준 1946: 신입 사원 (그리디/실버1)
 *
 * 연산1: 지원자 배열을 서류 순위에 따라 오름차순 정렬.
 * 연산2: 정렬된 배열을 통해 면접 순위를 확인하며 그리디 알고리즘을 적용해 채용 가능 인원 결정.
 * 연산3: 각 지원자의 면접 순위가 이전 지원자의 최소 면접 순위보다 높으면 채용, 최소 순위 갱신.
 *
 * input:
 *   - input: 전체 입력 데이터.
 *
 * output:
 *   - 각 테스트 케이스별로 채용할 수 있는 최대 인원수를 배열로 반환.
 */

function solution(input) {
  const t = parseInt(input[0]);
  let index = 1;
  const results = [];

  for (let i = 0; i < t; i++) {
    const n = parseInt(input[index]);
    const applicants = [];

    for (let j = 0; j < n; j++) {
      index++;
      applicants.push(input[index].split(" ").map(Number));
    }

    results.push(solveTestCase(applicants));
    index++;
  }

  return results;
}

function solveTestCase(applicants) {
  // 서류 순위로 정렬
  applicants.sort((a, b) => a[0] - b[0]);

  let maxHire = 1; // 첫 지원자는 항상 채용 가능
  let minInterviewRank = applicants[0][1]; // 첫 지원자의 면접 순위

  for (let j = 1; j < applicants.length; j++) {
    const currentInterviewRank = applicants[j][1];
    if (currentInterviewRank < minInterviewRank) {
      maxHire++;
      minInterviewRank = currentInterviewRank;
    }
  }

  return maxHire;
}

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
// const input = require("fs").readFileSync("exam.txt").toString().trim().split("\n");

const results = solution(input);
results.forEach((result) => console.log(result));
