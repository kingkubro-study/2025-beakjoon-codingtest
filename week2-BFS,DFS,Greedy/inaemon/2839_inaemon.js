/** 백준 2839: 설탕 배달 (그리디/실버4)
 *
 * 설탕 봉지 3kg, 5kg 2종류
 * 설탕 배달시 최소 개수 봉지 구하기
 */
// input(int): 설탕 개수
// output(int): 배달에 필요한 최소 봉지 개수
function solution(N) {
    let answer = 0;

    if (N % 5 === 0) {  // 5로 나눠떨어질 때
        answer = N / 5;

    } else {
        let p = 0;
        while (N > 0) {
            N -= 3;
            p += 1;
            if (N % 5 === 0) {  // 3kg과 5kg를 조합해서 담을 수 있을 때
                p += N / 5;
                answer = p;
                break;
            } else if (N === 1 || N === 2) {  // 설탕 봉지만으로 나눠줄 수 없을 때
                answer = -1;
                break;
            } else if (N === 0) {  // 3으로 나눠떨어질 때
                answer = p;
                break;
            }
        }
    }

    return answer;
}


// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫째 줄에서 입력한 값 (정수 1개
const N = parseInt(input[0]);

// 출력
console.log(solution(N));