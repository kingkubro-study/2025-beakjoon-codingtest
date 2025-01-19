/** 백준 1931: 회의실 배정 (그리디/골드5)
 *
 * 회의실 1개
 * 회의 N개
 * 각 회의 i는 시작 시간, 끝나는 시간 주어짐
 * 회의가 겹치지 않게 회의실 사용할 수 있는 최대 회의 수 구하기
 */
// input(int, int list): 총 회의 수, 회의 시작/종료 시간 N개
// output(int): 최대로 가능한 회의 수
function solution(N, dataList) {
    let answer = 0;
    let endPoint = 0; // 마지막 회의 종료 시간

    // 종료 시간을 기준으로 오름차순 정렬
    dataList.sort((x, y) => {
        // 종료 시간이 같으면 
        if (x[1] === y[1]) {
            // 시작 시간의 차를 기준으로 정렬
            return x[0] - y[0];
        }

        // 종료 시간의 차를 기준으로 정렬
        return x[1] - y[1];
    });
    
    
    // 회의를 하나씩 확인
    for (let i = 0; i < dataList.length; i++) {
        // 현재 회의의 시작 시간과 종료 시간
        let currentStart = dataList[i][0];
        let currentEnd = dataList[i][1];

        // 이전 회의의 종료 시간보다 현재 회의의 시작 시간이 크거나 같으면
        if (endPoint <= currentStart) {
            // 회의 선택
            answer += 1;
            
            // 이전 회의의 종료 시간을 선택한 회의의 종료 시간으로 업뎃
            endPoint = currentEnd;
        }
    }
    
    return answer;
}


// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫째 줄에서 입력한 값 (정수 1개)
const N = parseInt(input[0]);

// 둘째 줄 ~ N번째 줄에서 입력한 값 (정수 2개씩 N줄)
let dataList = [];

// N개의 회의 시작 시간과 종료 시간 입력받기
for (let i = 1; i <= N; i++) {
    const [start, end] = input[i].split(' ').map(Number);
    dataList.push([start, end]);
  }

// 출력
console.log(solution(N, dataList));