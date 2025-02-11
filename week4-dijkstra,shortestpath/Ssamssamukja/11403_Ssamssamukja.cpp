#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <queue>
using namespace std;

int main() {
    int N;
    cin >> N;

    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
            cin >> graph[i][j];

    for (int k = 0; k < N; k++) {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (graph[i][k] == 1 && graph[k][j] == 1)
                    graph[i][j] = 1;
            }
        }
    }

    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            cout << graph[i][j] << " ";
        }
        cout << endl;
    }
    return 0;
}



/* 11403 경로 찾기
* 가중치 없는 방향 그래프 G, i -> j 
* 정점의 개수 N(1~100), N개 줄에 그래프 인접 행렬. 
* 인접 행렬 주어짐. (1이면 간선 존재, 0이면 없음)
* 
* 출력 : N개의 줄에 걸쳐 문제 정답을 인접행렬 형식으로 출력함. 
* i -> j 양수인 경로 존재시 i번째 줄의 j번째 숫자를 1로, 없으면 0으로 출력해야 함. 
* 정점쌍 경로 존재 여부 구하기.
* 플로이드-워셜 알고리즘 ?? graph를 업데이트 하면서 i -> j로 가는 길이 있는지 체크, 새 경로 발견시 1 변경.
*/