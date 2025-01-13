/** 백준 1966: 프린터 큐 (큐/실버3)
 *
 * 원소가 큰 순서대로 큐에서 빼고 안 그럼 맨 뒤에 배치 (원형큐 느낌?)
 * 
 * 1단계: 큐 맨 앞 원소의 값 확인
 * 2단계: 큐 나머지 원소들 중 값이 더 큰 원소가 있으면 맨 뒤에 배치
 * 3단계: 없으면 큐에서 출력
 */

// 방법1: 13020 KB, 204 ms
// input(int, int, int list): 큐 길이, 몇 번째로 인쇄되었는지가 궁금한 index, 큐 원소(1~9, 중복 허용)
// output(int): 해당 index가 몇 번째로 인쇄되었는 지 출력
function solution(len, idx, dataList) {
    let answer = 0; // 인쇄 개수 현황

    // (값, 인덱스) 형태로 큐에 저장
    // pop() 또는 shift() 호출시 index가 바뀌므로 초기 index도 저장해야 함
    let queue = dataList.map((value, i) => [value, i]);

    while (queue.length > 0) {
        // 맨 앞 원소 꺼내기
        const [front, frontIdx] = queue.shift();

        // 맨 앞 원소 제외하고, 최댓값 찾기
        const maxVal = Math.max(...queue.map(([val]) => val));
        

        if (front >= maxVal) {
            // FIFO
            // 맨 앞 원소가 최댓값이면 큐에서 꺼내기
            answer++; // 하나를 처리했으므로 count 증가

            // 큐에서 빼고 난 후 index 체크
            if (frontIdx === idx) {
                return answer; // 처리된 개수 출력
            }
        } else {
            // 맨 뒤로 보내기
            queue.push([front, frontIdx]);
        }

        // 여기서 처리하면 index만 고려해서 틀림
        // maxVal이 있는 경우엔 맨 뒤로 보내는 것만 수행하고 다시 돌아야 함.
        /*
        if (frontIdx === idx) {
            return answer; // 처리된 개수 출력
        }
        */
    }
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫째 줄에서 입력한 값 (정수 1개)
const N = parseInt(input[0]);

// 2N줄에서 입력한 값
// 2줄씩 짝지어서 함수에 전달
for (let i = 1; i <= 2 * N; i += 2) {
    // 첫 번째 줄에서 두 개의 원소를 받음
    const [input1, input2] = input[i].split(' ').map(Number);
    
    // 두 번째 줄에서 input1만큼의 값을 받음
    const dataList = input[i + 1].split(' ').map(Number);
    
    // 출력
    console.log(solution(input1, input2, dataList));
}


// 방법2: 13168 KB, 204 ms
/*
function solution(len, idx, dataList) {
    let answer = 0; // 인쇄 개수 현황
    
    // (값, 인덱스) 형태로 큐에 저장
    // pop() 또는 shift() 호출시 index가 바뀌므로 초기 index도 저장해야 함
    let queue = dataList.map((value, i) => [value, i]);
    
    while (queue.length > 0) {
        // 맨 앞 원소 peek
        const [front, frontIdx] = queue[0];

        // 맨 앞 원소 제외하고, 최댓값 찾기
        const maxVal = Math.max(...queue.slice(1).map(([val]) => val));
        

        if (front >= maxVal) {
            // FIFO
            // 맨 앞 원소가 최댓값이면 큐에서 꺼내기
            queue.shift();
            answer++; // 하나를 처리했으므로 count 증가

            // 큐에서 빼고 난 후 index 체크
            if (frontIdx === idx) {
                return answer; // 처리된 개수 출력
            }
        } else {
            // 맨 뒤로 보내기
            queue.shift();
            queue.push([front, frontIdx]);
        }
    }
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫째 줄에서 입력한 값 (정수 1개)
const N = parseInt(input[0]);

// 2N줄에서 입력한 값
// 2줄씩 짝지어서 함수에 전달
for (let i = 1; i <= 2 * N; i += 2) {
    // 첫 번째 줄에서 두 개의 원소를 받음
    const [input1, input2] = input[i].split(' ').map(Number);
    
    // 두 번째 줄에서 input1만큼의 값을 받음
    const dataList = input[i + 1].split(' ').map(Number);
    
    // 출력
    console.log(solution(input1, input2, dataList));
}
*/