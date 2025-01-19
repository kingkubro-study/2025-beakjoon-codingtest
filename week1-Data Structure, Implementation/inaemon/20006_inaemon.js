/** 백준 20006: 랭킹전 대기열 (구현/실버2)
 *
 * step1: 레벨 -10 ~ +10 까지 입장 가능
 * step2: 매칭 가능한 방 O -> 먼저 생성된 방 입장, 정원 찰 때까지 대기
 * step3: 매칭 가능한 방 X -> 새로운방 생성
 * step4: 정원이 찬 방은 게임 시작
 */

// input(int, int, str list): 플레이어 수, 방의 정원, 플레잉어 레벨과 닉네임 리스트
// output(string): 게임 시작하면 Started!,  대기 중이면 Waiting!,  플레이어 정보
function solution(pLen, rLen, peopleList) {
    const people = [];
    const rooms = [];

    // 사람 스택에 데이터 넣기
    for (let i = 0; i < pLen; i++) {
        const [lv, id] = peopleList[i];
        people.push([parseInt(lv), id]);
    }
    
    // 사람 스택만큼 돌기: 사람을 방에 배정
    for (let i = 0; i < people.length; i++) {
        const [lv, id] = people[i];     // i번째 사람
        let flag = false;               // 방있없
        
        // 기존 방 중에 들어갈 수 있는 방 찾기
        for (let j = 0; j < rooms.length; j++) {
            // j번째 방의 인원 확인
            if (rooms[j][1].length === rLen) {
                continue;
            }

            // 방 레벨 확인
            if (rooms[j][0] - 10 <= lv && lv <= rooms[j][0] + 10) {
                flag = true;
                // 방에 사람 추가
                rooms[j][1].push([lv, id]);
                break;
            }
        }

        // 들어갈 수 있는 방이 없으면 새로운 방을 생성
        if (!flag) {
            // 방 정보에는 레벨과 사람 배정
            const room = [lv, [[lv, id]]]

            // 방 스택에 새로운 방 추가
            rooms.push(room);
        }
    }

    // 방 스택만큼 돌기
    for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];

        // 정원이 찬 방: 게임 시작
        if (room[1].length === rLen) {
            console.log('Started!');

        // 정원이 차지 않은 방: 대기
        } else {
            console.log('Waiting!');
        }

        // 플레이어 정렬: 이름 사전 순
        const players = room[1].sort((a, b) => a[1].localeCompare(b[1]));
        
        // 플레이어 출력
        for (let j = 0; j < players.length; j++) {
            console.log(players[j].join(' '));
        }
    }
}


// 입력
const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');

// 첫 번째 줄에서 입력한 값 (정수 2개)
const [pLen, rLen] = input[0].split(' ').map(Number);

// 두 번째 줄에서 입력한 값 (문자열 2개: 각 줄마다 사람의 레벨과 아이디를 공백으로 구분하여 입력)
const peopleList = input.slice(1).map(line => line.split(' '));

// 출력
solution(pLen, rLen, peopleList);
