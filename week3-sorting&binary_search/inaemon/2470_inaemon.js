/** 백준 2470: 두 용액 (정렬/골드5)
 *
 * 산성 용액 (양의 특성값)과 알칼리성 용액 (음의 특성값)
 * 각 용액은 특성값을 가짐
 * 두 용액 혼합 -> 특성값을 합하기 -> 0에 가까운 수를 만드는 걸 목표
 * 산+산, 알+알, 산+알, 다 가능
 * 
 * 0에 가장 가까운 혼합액 특성값 찾기
 */

// input(int, int list): 전체 용액 수 N, N개의 용액 특성값
// output(int, int): 0에 가까운 용액을 만들어내는 두 용액의 특성 값
function solution(N, dataList) {
    let answer = [];    // 두 용액 특성 값
    
    let start = 0;      // 시작 용액 index
    let end = N - 1;    // 끝 용액 index
    let min = Infinity; // 합친 최소값
    
    // 오름차순 정렬
    dataList.sort((a, b) => a - b);
    
    // 교집합 찾기
    while (start < end) {
        // 두 용액 합치기
        const sum = dataList[start] + dataList[end];

        // 최소값이 더 크면
        if (Math.abs(sum) < min) {
            // 최소값 업뎃
            min = Math.abs(sum);

            // 정답 용액 두 개 선정
            answer = [dataList[start], dataList[end]];

            // 만약 합이 0이면 이상적인 최소값이니깐 그만해도 됨.
            if (sum === 0) break;
        }

        // 합이 음수면 start를 땡기고, 음수면 end를 땡겨
        sum < 0 ? start++ : end--;
    }

    return answer.join(' ');
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let i = 0;

// 첫째 줄에서 입력한 값 (정수 1개: 전체 용액 개수)
const N = parseInt(input[i++]);

// 둘째 줄에서 입력한 값 (정수 N개: 용액 별 특성값)
const dataList = input[i++].split(' ').map(Number);


// 출력
console.log(solution(N, dataList));