#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

struct Player {
    int level;
    string nickname;
};

struct Room {
    int minLevel;
    int maxLevel;
    vector<Player> players;
    int capacity;
    bool isStarted() {
        return players.size() == capacity;
    }
};

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    int p, m;
    cin >> p >> m;

    vector<Room> rooms;

    for (int i = 0; i < p; i++) {
        int l;
        string n;
        cin >> l >> n;

        bool matched = false;

        for (auto& room : rooms) {
            if (room.players.size() < room.capacity &&
                room.minLevel <= l && l <= room.maxLevel) {
                room.players.push_back({ l, n });
                matched = true;
                break;
            }
        }

        // 새 방 생성
        if (!matched) {
            Room newRoom = { l - 10, l + 10, {}, m };
            newRoom.players.push_back({ l, n });
            rooms.push_back(newRoom);
        }
    }

    for (auto& room : rooms) {
        // 닉네임 사전순 정렬
        sort(room.players.begin(), room.players.end(), [](const Player& a, const Player& b) {
            return a.nickname < b.nickname;
            });

        // 방 상태 출력
        if (room.isStarted()) {
            cout << "Started!\n";
        }
        else {
            cout << "Waiting!\n";
        }

        // 방의 플레이어 정보 출력
        for (const auto& player : room.players) {
            cout << player.level << " " << player.nickname << "\n";
        }
    }

    return 0;
}


/*
* 20006번 랭킹전 대기열
* 
* 플레이어 적절한 방에 배치 / 새 방 생성. 
* 각 방의 상태(대기 중/ 게임 시작 여부)
* 
* 입력은 플레이어 수 p, 정원 m
* 각 플레이어 정보 레벨 l과 닉네임 n
* 
* 매칭 가능한 방 없으면 새로운 방.
* 벡터로 방들 관리
* 
* 정보 입력 받아 기본 방 순회하고 입장 가능한 방을 찾고. 입장 가능한 방 없으면 새로운 방 생성. 방 가득 차면 상태를 Started.
* 
* 출력은 방 순서대로 . 방 플레이어 리스트는 닉네임 기준 정렬 방 상태랑 플레이어 정보 출력
* 
* auto&로 참조하여 사용
*/