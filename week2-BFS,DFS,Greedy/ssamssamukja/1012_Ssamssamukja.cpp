#include <iostream>
#include <vector>
#include <algorithm>
#include <queue>
using namespace std;

int T, M, N, K;
int field[50][50];
bool visited[50][50];
int dx[] = { 0,0,-1,1 };
int dy[] = { -1,1,0,0 };

void DFS(int x, int y) {
    visited[x][y] = true;

    for (int i = 0;i < 4;i++) { //상하좌우 이동해서 연결된 배추 계속 탐색, 방문한건 visited에 true
        int nx = x + dx[i];
        int ny = y + dy[i];

        if (nx >= 0 && nx <M && ny >= 0 && ny<N) { // 위치 유효한지 확인
            if (!visited[nx][ny] && field[nx][ny] == 1) { // 방문하지 않았고 배추 있는 걸 찾아서 다시 DFS
                DFS(nx, ny);
            }
        }
    }
}



int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);

    cin >> T;
    while (T--) {
        cin >> M >> N >> K;

        fill(&field[0][0], &field[0][0] + 50 * 50, 0);
        fill(&visited[0][0], &visited[0][0] + 50 * 50, false);

        //배추 위치 입력
        for (int i = 0;i < K;i++) {
            int x, y;
            cin >> x >> y;
            field[x][y] = 1;
        }

        int worm_count = 0;

        // 찾기
        for (int i = 0;i < M;i++) {
            for (int j = 0;j < N;j++) {
                if (!visited[i][j] && field[i][j] == 1) { // 방문하지 않았고 해당 위치에 배추 있는 경우
                    DFS(i, j);
                    worm_count++;
                }
            }
        }
        cout << worm_count << "\n";
    }
    return 0;
}

/*
* 1012 유기농 배추
* 
* 어떤 배추에 한마리라도 살고 있으면 인접한 다른 배추로 이동가능. 해충으로부터 보호.
* 테스트 개수 T, 가로길이M 1-50, 세로길이 N 1- 50, 위치 개수 K 1- 2500, X(0 ~ M-1), Y(0~N-1) 주어짐. 위치 같은 경우 없음
* 
* => 연결된 영역 개수만 세자.
* 배열로 표현하기. 방문한 배추는 0으로 변경. 지렁이 개수 증가. 
* DFS 반복
* 
*/