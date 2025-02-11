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
* 14496 �״�, �׸Ӱ� �Ǿ�
* 1->2 �ǵ��� ġȯȽ���� ������.ġȯ �Ұ��� ���=-1
* ��ü ���� �� N, ġȯ ������ ���ڽ� �� M.
* �� ���� ��ġ �� ù��° �ſ��� a��, �� ��° �ſ��� b�� ã��. 
* ���� ã��. �ű⼭ ���� ������ �ڸ� ��ġ��� ��. 0�̸� �ʱ� ������ �����1 ��ȯ.
* �ƴϸ�, ���� �� ��° - ù��° �� 0�̸� ����� ++ �ϰ� ��ȯ.
* �ƴϸ� �ٽ� �� ���� �ι�°�� a�� �ΰ�, ù��°�� b�� �ּ� �ݺ�. 
* BFS Ž��.
*/