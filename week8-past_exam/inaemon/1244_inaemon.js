/** 백준 1244: 스위치 켜고 끄기 (구현/실버4)
 *
 * <스위치>
 * 1부터 연속된 번호
 * 1:ON, 0:OFF
 * 
 * <학생>
 * 1~스위치개수 사이의 자연수 번호
 * 남자: 학생 번호의 배수인 스위치 번호 -> 스위치 상태 변경
 * 여지: 학생 번호와 동일한 스위치 번호 -> 해당 스위치 상태 변경 + 해당 스위치 기준 좌우 대칭 스위치가 서로 상태가 같은 범위까지 상태 변경
 * 
 * <예시>
 * 남: 번호 3 -> 3번, 6번, 9번, ... 스위치 상태 변경
 * 여: 번호 3 -> 3번 스위치 상태 변경
 *           -> 2와 4가 같은 상태 -> 변경  + 1과 5가 같은 상태 -> 변경
 *           -> 2와 4가 같은 상태 -> 변경  + 1과 5가 다른 상태 -> 종료
 *           -> 2와 4가 다른 상태 -> 종료
 * 여: 번호 4 -> 4번 스위치 상태 변경
 *           -> 3과 5가 같은 상태 -> 변경  + 2와 6이 같냐? ...
 *           -> 3과 5가 다른 상태 -> 종료
 */
function m(switchList) {
  
}

// input(int, int list, int, int matrix): 스위치 개수, 스위치 상태 리스트, 학생 수, 학생 정보 리스트
// output(int list): 스위치 상태 리스트
function solution(N, switchList, M, studentList) {
  let answer = switchList;

  for(let i=0; i<M; i++) {
    const [gender, num] = studentList[i];

    if(gender === 1) {
      answer
    }else {
      
    }
  }

  return answer;
}


// 입력
const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");


let idx = 0;

// 첫째 줄: 정수 1개 (스위치 개수)
const N = parseInt(input[idx++]);

// 둘째 줄: 정수 리스트 (스위치 상태: 0, 1)
const switchList = input[idx++].split(" ").map(Number);

// 셋째 줄: 정수 1개 (학생 수)
const M = parseInt(input[idx++]);

// 넷째~줄: 정수 2개씩 (학생 성별, 학생 번호)
const studentList = [];
for(let i=0; i<M; i++) {
  const [gender, num] = input[idx++].split(" ").map(Number);
  studentList.push([gender, num]);
}

// 출력
console.log(solution(N, switchList, M, studentList));
