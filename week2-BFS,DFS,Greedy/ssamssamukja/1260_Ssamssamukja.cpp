#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

vector<int> graph[1001];
bool visited[1001];

void DFS(int v) { // 깊이 우선
    cout << v << " "; // 방문한 노드 출력
    visited[v] = true;

    for (int next : graph[v]) {
        if (!visited[next]) {
            DFS(next); // 재귀
        }
    }
}

void BFS(int start) { // 넓이 우선
    queue<int> q;
    q.push(start);
    visited[start] = true;

    while (!q.empty()) {
        int v = q.front();
        q.pop();
        cout << v << " ";

        for (int next : graph[v]) {
            if (!visited[next]) {
                visited[next] = true;
                q.push(next);
            }
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    int N, M, V;
    cin >> N >> M >> V;

    for (int i = 0;i < M;i++) {
        int u, v;
        cin >> u >> v;
        graph[u].push_back(v);
        graph[v].push_back(u); // 양방향 그래프이기 때문
    }

    // 정점 번호 작은 것부터 방문하기 위해 정렬하기
    for (int i = 1; i <= N; i++) {
        sort(graph[i].begin(), graph[i].end());
    }

    // DFS
    fill(visited, visited + 1001, false);
    DFS(V);
    cout << "\n";

    // BFS
    fill(visited, visited + 1001, false);
    BFS(V);
    cout << "\n";

    return 0;
}

/*
* DFS와 BFS
* DFS는 스택(재귀)를 사용하여 깊이 우선 탐색
* BFS는 큐를 사용하여 너비 우선 탐색
* 
* 두 정점 사이 여러 개 간선 존재 가능, 양방향임.
* 
* 
* fill : 배열이나 컨테이너의 모든 원소를 특정 값으로 초기화할 때 사용 (시작주소, 끝주소, 채울값)
* 배열 빠르게 초기화 가능
*/