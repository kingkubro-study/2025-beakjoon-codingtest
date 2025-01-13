#include <iostream>
#include <deque>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    int N, M;
    cin >> N >> M;

    deque<int> dq;
    for (int i = 1; i <= N; i++) {
        dq.push_back(i);
    }

    int totalMoves = 0;
    while (M--) {
        int target;
        cin >> target;

        int targetIndex = 0;
        for (int i = 0; i < dq.size(); i++) {
            if (dq[i] == target) {
                targetIndex = i;
                break;
            }
        }

        // 왼쪽, 오른쪽 이동 중 최소 연산 선택
        if (targetIndex <= dq.size() / 2) {
            // 왼쪽 이동이 더 적은 경우
            totalMoves += targetIndex;
            while (targetIndex--) {
                dq.push_back(dq.front());
                dq.pop_front();
            }
        }
        else {
            // 오른쪽 이동이 더 적은 경우
            totalMoves += dq.size() - targetIndex;
            int moves = dq.size() - targetIndex;
            while (moves--) {
                dq.push_front(dq.back());
                dq.pop_back();
            }
        }
        // 뽑아내
        dq.pop_front();
    }

    cout << totalMoves << endl;
    return 0;
}



/*
1021 회전하는 큐
1. 첫 번째 원소 뽑아낸다
2. 왼쪽으로 한 칸 이동시켜 첫번째 원소 뽑아내서 뒤로 이동시키기. 뒤에서 밀기
3. 오른쪽으로 한 칸 이동시켜 맨 뒤의 원소 뽑아내서 앞으로 이동시키기. 앞에서 밀기

어딨는지 일단 찾고 제일 뒤랑 가까운지 제일 앞이랑 가까운지 인덱스로 확인. 
맨 첫번째 원소가 되어야 하는 거잖아. 

 큐의 크기 N, 뽑아낼 원소의 개수 M

*/