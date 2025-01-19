/** 백준 9012: 괄호 (스택/실버4)
 *
 * YES: (())(), (X) 구조
 * NO: (()(
 */

// input(int, string list): 문자열 개수, 괄호 문자열 리스트
// output(string): 각 괄호 문자열마다 검증 후 YES, NO 출력
function solution(N, dataList) {
    let answer = "";

    for(let i=0; i<N; i++) {
        // 괄호 문자열 하나
        const data = dataList[i];

        // 문자열 검증: 스택 이용
        let stack = [];
        let j = 0;
        let b = true;
        
        while(j !== data.length) {
            if(data[j] === '(') {
                stack.push(data[j]);

            }else if(data[j] === ')') {
                if (stack.length > 0) {
                    stack.pop();  // 스택에 괄호가 있으면 짝을 맞추고 pop
                }else{
                    b = false;
                    break;
                }

            }else {
                b = false;
                break;
            }

            j++;
        }

        if(stack.length !== 0) {
            b = false;
        }

        if(b) {
            answer += "YES\n";
        }else {
            answer += "NO\n";
        }
    }

    return answer;
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫째 줄에서 입력한 값 (정수 1개)
const N = parseInt(input[0]);

// 두 번째 줄부터 N번째 줄까지 입력한 값 (문자열 N개)
const dataList = input.slice(1, N + 1);

// 출력
console.log(solution(N, dataList));
