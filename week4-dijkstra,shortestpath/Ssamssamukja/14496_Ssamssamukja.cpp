#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <queue>
using namespace std;

int main() {
    int a, b, N, M;
    cin >> a >> b;
    cin >> N >> M;

    vector<vector<int>> graph(N + 1);
    for (int i = 0; i < M; i++) {
        int x, y;
        cin >> x >> y;

        graph[x].push_back(y);
        graph[y].push_back(x);
    }

    vector<int> distance(N + 1, 1e9);
    queue<int> q;

    distance[a] = 0;
    q.push(a);

    while (!q.empty()) {
        int cur = q.front();
        q.pop();

        for (int next : graph[cur]) {
            if (distance[next] == 1e9) {
                distance[next] = distance[cur] + 1;
                q.push(next);
            }
        }
    }

    cout << (distance[b] == 1e9 ? -1 : distance[b]);
    return 0;
}

/*
* 14496 그대, 그머가 되어
* 1->2 되도록 치환횟수를 구하자.치환 불가능 경우=-1
* 전체 문자 수 N, 치환 가능한 문자쌍 수 M.
* 한 벡터 위치 중 첫번째 거에서 a를, 두 번째 거에서 b를 찾아. 
* 각각 찾아. 거기서 각각 벡터의 자리 위치대로 빼. 0이면 초기 설정된 결과값1 반환.
* 아니면, 각각 두 번째 - 첫번째 가 0이면 결과값 ++ 하고 반환.
* 아니면 다시 각 벡터 두번째를 a로 두고, 첫번째를 b로 둬서 반복. 
* BFS 탐색.
*/