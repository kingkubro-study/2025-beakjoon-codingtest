#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

int N, M;
int maze[100][100];
bool visited[100][100];

int dx[] = { 0,0,-1,1 };
int dy[] = { -1,1,0,0 };

int BFS(int startX, int startY) { // 넓이 우선
    queue<pair<int, int>> q;
    q.push({ startX, startY });
    visited[startX][startY] = true;

    // (1,1)부터 시작하므로 최단 거리 1로 초기화
    int distance[100][100] = { 0 };
    distance[startX][startY] = 1;

    while (!q.empty()) {
        int x = q.front().first;
        int y = q.front().second;
        q.pop();

        if (x == N - 1 && y == M - 1) {
            return distance[x][y];
        }


        for (int i = 0;i < 4;i++) {
            int nx = x + dx[i];
            int ny = y + dy[i];

            if (nx >= 0 && nx < N && ny >= 0 && ny < M) {
                if (!visited[nx][ny] && maze[nx][ny] == 1) {
                    visited[nx][ny] = true; // 방문처리
                    q.push({ nx,ny });
                    distance[nx][ny] = distance[x][y] + 1;
                }
            }
        }
    }
    return -1;
}
   
int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);

    cin >> N >> M;

    // 미로 입력 받기 
    for (int i = 0;i < N;i++) {
        string row;
        cin >> row;

        for (int j = 0;j < M;j++) {
            maze[i][j] = row[j] - '0';
        }
    }
    cout << BFS(0, 0) << "\n";
    return 0;
}

/*
* 2178 미로탐색
* 1초 제한
* N*M 배열
* (1,1)에서 (N,M)으로 이동 위한 칸수 구하기.
* N(2<=N), M(<=100) N개 줄에는 M개정수로 미로 주어짐.  
* 
* 출력 : 지나야 하는 최소 칸 수. 
* BFS 사용하기. 최단 거리(최소 칸 수 찾기)
* 큐에 현재 위치와 현재까지의 거리를 저장하고 상하좌우 이동하고 칸 탐색하기.
* 도착점(N,M) 도착 시 이동횟수 출력
* 
* row[j] - '0'; => 문자열 입력을 숫자로 변환
*/