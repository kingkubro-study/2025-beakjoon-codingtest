/** 백준 1406: 에디터 (문자열/실버2)
 *
 * L: 앞 move
 * D: 뒤 move
 * B: 앞 pop
 * P X: 앞에 X라는 문자 push
 */

// input(string, int, str list): 초기 문자열, 명령어 개수, 명령어 리스트
// output(string): 최종 문자열

// 스택 풀이, 110660 KB, 496 ms
function solution(str, N, commands) {
    let answer = "";

    // cursor 앞/뒤를 따로 스택 관리
    let front = [];
    let back = [];

    // 초기 커서는 맨 뒤에 있으므로
    // 초기 문자열을 앞 스택에 저장
    for (let i = 0; i < str.length; i++) {
        front.push(str[i]);
    }

    // 명령어 수행
    for(let i=0; i<N; i++) {
        // P 문자일 경우, P와 문자 분리
        let data = commands[i].split(' ');

        switch(data) {
            case 'L':   // 앞 -> 뒤, LIFO
                if(front.length > 0) {
                    back.push(front.pop());
                }
                break;
            case 'D':   // 뒤 -> 앞, LIFO
                if(back.length > 0) {
                    front.push(back.pop());
                }
                break;
            case 'B':   // 뒤에서 삭제
                if(back.length > 0) {
                    back.pop();
                }
                break;
            case 'P':   // 뒤에 추가
                back.push(data[1]); // 'P 문자'에서 문자 부분을 삽입
                break;
        }
    }

    // 배열을 다시 문자열로 반환
    answer = front.join('') + back.reverse().join('');

    return answer;

}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 번째 줄에서 입력한 값 (문자열 1개)
const str = input[0];

// 두 번째 줄에서 입력한 값 (정수 1개)
const N = parseInt(input[1]);

// 세 번째 줄에서 입력한 값 (정수 N개)
const commands = input.slice(2, N+2);

// 출력
console.log(solution(str, N, commands));



// 문자열 풀이, 시간 초과
/*
function solution(str, N, commands) {
    let answer = "";
    let cursor = str.length -1;
    let stack = str.split(''); // 문자열을 배열로 변환

    // 명령어 수행
    for(let i=0; i<N; i++) {
        let data = commands[i];

        switch(data) {
            case 'L':
                if(cursor > 0)
                    cursor --;
                break;
            case 'D':
                if(cursor < str.length-1)
                    cursor ++;
                break;
            case 'B':
                // 커서 왼쪽의 문자 삭제
                if (cursor > 0) {
                    stack.splice(cursor-1, 1);
                    cursor --;
                }
                break;
            default:
                // P 문자에서 P와 문자 분리
                const command = commands[i].split(' ');
                // 커서 위치에 문자 삽입
                stack.splice(cursor, 0, command[1]);
                cursor ++;
                break;
        }
    }

    // 배열을 다시 문자열로 반환
    answer = stack.join('');

    return answer;

}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 번째 줄에서 입력한 값 (문자열 1개)
const str = input[0];

// 두 번째 줄에서 입력한 값 (정수 1개)
const N = parseInt(input[1]);

// 세 번째 줄에서 입력한 값 (정수 N개)
const commands = input.slice(2, N+2);

// 출력
console.log(solution(str, N, commands));
*/