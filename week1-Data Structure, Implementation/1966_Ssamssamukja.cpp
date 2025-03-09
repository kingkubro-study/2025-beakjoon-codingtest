#include <iostream>
#include <queue>
#include <vector>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    int T;
    cin >> T;

    while (T--) {
        int N, M;
        cin >> N >> M;

        queue<pair<int, int>> q;
        priority_queue<int> priorities; // 중요도 우선순위 큐

        for (int i = 0; i < N; i++) {
            int priority;
            cin >> priority;
            q.push({ priority, i });
            priorities.push(priority);
        }

        int printOrder = 0;

        while (!q.empty()) {
            int currentPriority = q.front().first;
            int currentIndex = q.front().second;
            q.pop();

            // 현재 문서의 중요도가 가장 높은 경우
            if (currentPriority == priorities.top()) {
                printOrder++;
                priorities.pop(); // 우선순위 큐에서 제거

                // 궁금한 문서가 출력된 경우
                if (currentIndex == M) {
                    cout << printOrder << '\n';
                    break;
                }
            }
            else {
                // 중요도가 높은 문서가 남아 있는 경우 큐의 뒤로 이동
                q.push({ currentPriority, currentIndex });
            }
        }
    }

    return 0;
}


/*
1966 프린터 큐

현재 큐의 가장 앞에 있는 문서의 중요도 확인. 
현재 문서보다 중요도 높은 게 있으면 현재 문서 맨 뒤로 재배치 함. 그렇지 않으면 인쇄. 
같은 건 그냥 인쇄.

ABCD -> BCDA -> CDAB -> C, DAB -> D, AB -> A, B -> B

중요도 1 ~ 9

첫 줄에 테스트 케이스 수. 테스트 케이스는 두 줄씩. 
맨 왼쪽이 0번째. 

문서 갯수 궁금문서 몇번째로 인쇄되는지. 

그냥 큐에서 맨 앞에 거 가져와서 비교하고 맞냐? 그럼 break. 아니다 싶으면 빼고 뒤로 넣어. 그걸 큐가 빌 때까지 반복해.
*/
