/* 백준 2504: 괄호의 값
 *
 * 올바른 괄호열: (()[[]]), (())[][]
 * 올바르지 않은 괄호열: ([)], (()()[]
 *
 * 괄호열 값
 * 규칙1: () 2,  [] 3
 * 규칙2: (X) 2*X,  [X] 3*X
 * 예시: ()[[]] 2+3*3=11,  (()[[]]) 2*(2+3*(3))=22
 */

// input(string): (()[[]])([])
// output(int): 괄호열 값
function solution(input) {
    let stack = [];
    let answer = 0;
    let weight = 1; // 가중치

    // 입력문자열을 순차적으로 처리
    for (let i = 0; i < input.length; i++) {
        // 문자 하나
        let char = input[i];

        // 경우의 수
        if (char === '(') {
            // 시작 문자를 스택에 넣고 가중치 추가
            stack.push(char);
            //stack.push(2*weight);
            weight *= 2;

        } else if (char === '[') {
            // 시작 문자를 스택에 넣고 가중치 추가
            stack.push(char);
            //stack.push(3*weight);
            weight *= 3;
            
        } else if (char === ')') {
            // 종료 문자인데, 스택이 비었으면 잘못된 괄호
            if (stack.length === 0) {
                return 0;
            }
            
            // 스택에서 빼기
            const p = stack.pop();
            
            // 스택에 넣은 게 '('가 아니었다면, 잘못된 괄호
            if (p !== '(') {
                return 0;
            }
            // 직전에 '('가 있었다면, 괄호 값 추가
            if (input[i - 1] === '(') {
                answer += weight;
            }

            // 스택에서 제거했으니 가중치 초기화
            weight /= 2;

        } else if (char === ']') {
            // 종료 문자인데, 스택이 비었으면 잘못된 괄호
            if (stack.length === 0) {
                return 0;
            }
            
            // 스택에서 빼기
            const p = stack.pop();
            
            // 스택에 넣은 게 '['가 아니었다면, 잘못된 괄호
            if (p !== '[') {
                return 0;
            }
            // 직전에 '['가 있었다면, 괄호 값 추가
            if (input[i - 1] === '[') {
                answer += weight;
            }

            // 스택에서 제거했으니 가중치 초기화
            weight /= 3;
        }
    }

    // 스택에 남아있는 값이 있으면 잘못된 괄호
    if (stack.length > 0) {
        return 0;
    }
    
    return answer;
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim();

// 출력
console.log(solution(input));



// 틀렸습니다: 가중치(깊이) 계산을 안 해서 (()())일 때 8이 아닌 4가 나옴. 2*2+2*2로 해야하는데
/*
function solution(input) {
    let stack = [];
    let answer = 0;

    // 입력문자열을 순차적으로 처리
    for (let i = 0; i < input.length; i++) {
        // 문자 하나
        let char = input[i];

        // 경우의 수
        if (char === '(') {
            // 시작 문자와 mapping되는 값을 스택에 넣기
            stack.push(2);

        } else if (char === '[') {
            // 시작 문자와 mapping되는 값을 스택에 넣기
            stack.push(3);

        } else if (char === ')') {
            // 종료 문자인데, 스택이 비었거나 '['와 mapiing되는 값이 있으면 잘못된 괄호
            if (stack.length === 0 || stack[stack.length - 1] === 3) {
                answer = 0;
                break;
            }

            // 스택에서 빼기
            const p = stack.pop();

            // 직전에 '('가 있었다면, 값 추가
            if (input[i - 1] === '(') {
                answer += p;
            }

        } else if (char === ']') {
            // 종료 문자인데, 스택이 비었거나 '('와 mapiing되는 값이 있으면 잘못된 괄호
            if (stack.length === 0 || stack[stack.length - 1] === 2) {
                answer = 0;
                break;
            }

            // 스택에서 빼기
            const p = stack.pop();

            if (input[i - 1] === '[') {
                answer += p;
            }
        }
    }

    // 스택에 남아있는 값이 있으면 잘못된 괄호
    if (stack.length > 0) {
        return console.log(0);
    }
    
    console.log(answer);
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim();

// 출력
solution(input);
*/