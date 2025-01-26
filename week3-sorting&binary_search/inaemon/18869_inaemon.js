/** 백준 18869: 멀티버스2 (정렬/골드5)
 *
 * 우주 M개
 * 각 우주는 행성 N개
 * 각 우주의 행성i와 행성j의 크기 관계가 모두 같으면 균등한 우주
 * 균등한 우주 몇쌍인지 구하기
 */

// input(int, int, int matrix): 우주 수 M, 우주별 행성 수 N, 우주별 행성별 크기 MxN
// output(int): 균등한 우주 쌍 개수
function solution(M, N, matrix) {
    let answer = 0;         // 균등한 우주 쌍 개수
    const universe = {};    // 우주 객체 (행성 순위 기록용)

    for (let j = 0; j < M; j++) {
        // N개 행성 크기 리스트
        const planets = matrix[j];

        // 행성 크기 오름차순 정렬 및 중복 제거 (Set 이용)
        // 고유 행성 크기
        const sortedPlanets = [...new Set(planets)].sort((a, b) => a - b);

        // 각 고유 행성별 순위 매기기
        const rank = {};
        sortedPlanets.forEach((planet, index) => {  // 행성 리스트 순회
            // 행성 별로 index 부여
            rank[planet] = index;
        });

        // 정렬 전 행성 크기 planets에 대한 순위 index(= rank[planet])를 mapping한 배열 생성
        // EX) planets = [5, 3, 7, 5]이고, rank = {3: 0(위), 5: 1(위), 7: 2(위)}일 때, rankedPlanets = [1, 0, 2, 1]
        const rankedPlanets = planets.map(planet => rank[planet]);

        // 행성 순위 조합 key 생성
        // rankedPlanets 배열을 string화
        // rankedPlanets = [1, 0, 2, 1] 이면 key = "1,0,2,1"
        const key = rankedPlanets.toString();

        // key 출현 횟수 (행성 순위 조합) 세기
        // 해당 key의 값이 있으면 1을 더하고, 없으면 1로 초기화
        universe[key] = (universe[key] || 0) + 1;
    }

    /*
    EX)
    universe = {
        "1,0,2": 2, // "1,0,2" 순위 조합이 2번 등장
        "2,0,1": 3  // "2,0,1" 순위 조합이 3번 등장
    };
    
    Object.values(universe); // [2, 3]
    */
    // 각 행성 순위 조합의 출현 횟수 순회
    // 중복을 제거한 행성들끼리 순위 조합
    for (const count of Object.values(universe)) {
        // nC2: 조합(n개 원소)에서 2개의 원소를 고르는 경우의 수
        // 2개씩 짝지을 수 있는 경우의 수
        answer += (count * (count - 1)) / 2;
    }
    
    return answer;
}

// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

let i = 0;

// 첫째 줄에서 입력한 값 (정수 2개: 우주 수 M, 우주별 행성 수 N)
const [M, N] = input[i++].split(' ').map(Number);

// 둘째 줄부터 M줄만큼 입력한 값
let matrix = [];
for (let j = 0; j < M; j++) {
    // 현재 우주의 N개 행성 크기
    matrix.push(input[i++].split(' ').map(Number));
}

// 출력
console.log(solution(M, N, matrix));