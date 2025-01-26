/** 백준 1477: 휴게소 세우기 (이진 탐색/골드4)
 *
 * 휴게소 N개 존재
 * 휴게소 M개 더 만들겨
 * 이미 휴게소가 있는 위치와 맨 끝 위치에는 못 만들어
 * 휴게소가 없는 구간의 최대 길이를 최소화하는 게 목표
 */

// input(int, int, int, int list): 지어진 휴게소 N개, 지을 휴게소 M개, 고속도로 길이 L, 지어진 휴게소 좌표 리스트
// output(int):  휴게소가 없는 구간들 중 가장 긴 구간의 최솟값
function solution(N, M, L, dataList) {
    let answer = 0; // 최대 거리의 최솟값
    let start = 0;
    let end = 0;

    // 시작점과 끝점을 추가
    let arr = [0, ...dataList, L];

    // 배열 오름차순 정렬
    arr.sort((a, b) => a - b);

    // 초기 최소 거리: 한 칸
    start = 1;
    // 초기 최대 거리: 종점 - 시작점
    end = L - 1;

    // 이진 탐색
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        let count = 0;

        // 각 구간 별로 설치할 휴게소의 수 계산 (첫 휴게소 제외)
        for (let i = 1; i < arr.length; i++) {
            const gap = arr[i] - arr[i - 1];

            // 중간 거리보다 갭이 크면
            if (gap > mid) {
                // 설치
                // 설치할 휴게소 수는 (구간 길이 - 1) // mid
                count += Math.floor((gap - 1) / mid);
            }
        }

        // 설치할 수 있는 휴게소가 M개 초과이면
        if (count > M) {
            start = mid + 1;    // 간격을 줄이기
        // 설치할 수 있는 휴게소가 M개 이하이면
        } else {
            end = mid - 1;      // 간격을 늘리기
            answer = mid;       // 최적의 최소 간격 저장
        }
    }
    

    return answer;
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let i = 0;

// 첫째 줄에서 입력한 값 (정수 3개: 지어진 휴게소 N개, 지을 휴게소 M개, 고속도로 길이 L)
const [N, M, L] = input[i++].split(' ').map(Number);

// 둘째 줄에서 입력한 값 (정수 N개: 지어진 휴게소 좌표 리스트)
// 주의: N = 0인 경우 둘째 줄은 빈 배열로 처리하래!!!! (안 그럼 런타임 에러 발생)
const dataList = N === 0 ? [] : input[i++].split(' ').map(Number);

// 출력
console.log(solution(N, M, L, dataList));