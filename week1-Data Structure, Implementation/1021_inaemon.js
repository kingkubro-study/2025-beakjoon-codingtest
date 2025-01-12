/** 백준 1021: 회전하는 큐 (덱/실버3)
 *
 * 양방향 순환 큐 (= 원형 큐)
 * 연산1: 1번째 원소 뽑기 -> 맨 앞 원소 제거 (FIFO)
 * 연산2: 왼쪽으로 한 칸 이동 -> 맨 앞 원소를 맨 뒤로
 * 연산3: 오른쪽으로 한 칸 이동 -> 맨 뒤 원소를 맨 앞으로
 */

// input(int, int, int list): 큐 길이, 뽑는 개수, 뽑을 index list (1부터 시작)
// output(int): 연산2와 연산3가 최소 필요한 횟수
function solution(N, M, dataList) {
    let answer = 0;
    let queue = [];

    // 큐에 데이터 넣기
    for(let i=0; i<N; i++) {
        queue.push(i+1);
    }


    // 뽑을 데이터만큼 돌기
    for (let i = 0; i < M; i++) {
        // 뽑을 데이터
        const data = dataList[i];

        // 큐의 맨 앞 원소
        const first = queue[0];

        // 연산1
        if(data === first){
            // FIFO
            queue.shift();

        }else {
            // 인덱스를 큐의 절반과 비교
            const idx = queue.indexOf(data);
            
            if (idx < queue.length/2) {
                // 연산2: 왼쪽으로 이동
                while(data !== queue[0]) {
                    queue.push(queue.shift());  // FIFO -> 첫 번째 값을 맨 뒤에 다시 넣기
                    answer++;
                }
            } else {
                // 연산3: 오른쪽으로 이동
                while(data !== queue[0]) {
                    queue.unshift(queue.pop()); // LIFO -> 맨 앞에 마지막 값을 넣기
                    answer++;
                }
            }

            // while 빠져나옴 -> data === first 상태
            // FIFO
            queue.shift();
        }
    }
    
    return answer;
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫째 줄에서 입력한 값 (정수 2개)
const [N, M] = input[0].split(' ').map(Number);

// 둘째 줄에서 입력한 값 (정수 M개) 
const dataList = input[1].split(' ').map(Number);

// 출력
console.log(solution(N, M, dataList));
