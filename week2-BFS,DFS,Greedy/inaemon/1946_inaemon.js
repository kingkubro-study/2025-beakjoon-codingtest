/** 백준 1946: 신입 사원 (그리디&정렬/실버1)
 *
 * 1차 서류심사 등수, 2차 면접시험 등수
 * 
 * 와 이거 문제 설명이 이상한데?;;
 * 각 지원자별로 서류/면접 두 등수가 모두 더 적은 등수를 가진 다른 지원자는 안 뽑힘
 * A: 2등+5등 B: 3등+6등= -> B는 A보다 서류, 면접 모두 등수가 뒤쳐져서 안 뽑힘.
 * 
 * 최대 선발 인원수 구하기
 */

// input(int, int list): 지원자 수, 지원자별 서류/면접 성적 리스트
// output(int): 최대 선발 인원 수
function solution(N, dataList) {
    let answer = 0;
    let score;

    // 1차 서류 심사 등수 - 2차 면접 심사 등수를 오름차순 정렬
    // 헷갈리는데, 등수가 낮을 수록 우선순위임. (점수는 높을수록 우선순위인데 지금은 등수임. 1등 > 99등)
    dataList.sort((a, b) => a[0] - b[0]);

    // 서류 기준 1등인 사람의 2차 면접 등수를 기준으로 두기
    //score = dataList[0][0];   // 1차 서류 등수   // 동점인 경우는 없으므로 필요X
    score = dataList[0][1];     // 2차 면접 등수
    answer++;                   // 얘는 1차 서류가 남들보다 앞서니깐 무조건 합격
    
    // 0번째 1등인 인간을 제외하고, N명 비교하기
    for (let i = 1; i < N; i++) {
        // 면접 경우만 확인하면 됨
        // 면접 점수가 서류 1등보다 높으면 합격
        if (score > dataList[i][1]) {
            score = dataList[i][1];
            answer++;
        }
    }

    return answer;
}


// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let idx = 0;

// 첫째 줄에서 입력한 값 (정수 1개)
const T = parseInt(input[idx++]); // 테스트 케이스스


for (let t = 0; t < T; t++) {
    // 정수 1개
    const N = parseInt(input[idx++]);
    
    // 정수 2개씩 총 N줄 입력받기
    let dataList = [];
    for (let n = 0; n < N; n++) {
        const [a, b] = input[idx++].split(' ').map(Number);
        dataList.push([a, b]);
    }

    // 출력
    console.log(solution(N, dataList));
}