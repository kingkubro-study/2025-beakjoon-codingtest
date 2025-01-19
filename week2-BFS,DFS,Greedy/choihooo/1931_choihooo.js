/**
 * 백준 1931: 회의실 배정 (그리디/실버1)
 *
 *
 * 연산1: 모든 회의를 종료 시간 기준으로 정렬 (종료 시간이 같다면 시작 시간 기준으로 정렬)
 * 연산2: 종료 시간이 가장 빠른 회의부터 선택하고 선택된 회의의 종료 시간 이후로 시작하는 회의들 중에서 다음 회의 선택
 *
 * input:
 *  - N: 회의의 수
 *  - meetings: 각 회의의 시작 시간과 종료 시간이 담긴 배열
 * output:
 *  - 최대 사용할 수 있는 회의의 개수
 */

function solution(input) {
    const N = parseInt(input[0]);
    const meetings = input.slice(1).map(line => line.split(' ').map(Number));

    // 회의를 끝나는 시간 기준으로 정렬, 끝나는 시간이 같으면 시작 시간 기준으로 정렬
    meetings.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

    let maxCount = 0;
    let lastEndTime = 0;

    for (let [start, end] of meetings) {
        if (start >= lastEndTime) {
            maxCount++;
            lastEndTime = end;
        }
    }

    return maxCount;
}

// 입력 처리
// const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");
const input = require("fs").readFileSync("exam.txt").toString().trim().split("\n");

// 결과 출력
const result = solution(input);
console.log(result);
