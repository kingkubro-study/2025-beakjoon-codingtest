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



/* 11403 ��� ã��
* ����ġ ���� ���� �׷��� G, i -> j 
* ������ ���� N(1~100), N�� �ٿ� �׷��� ���� ���. 
* ���� ��� �־���. (1�̸� ���� ����, 0�̸� ����)
* 
* ��� : N���� �ٿ� ���� ���� ������ ������� �������� �����. 
* i -> j ����� ��� ����� i��° ���� j��° ���ڸ� 1��, ������ 0���� ����ؾ� ��. 
* ������ ��� ���� ���� ���ϱ�.
* �÷��̵�-���� �˰��� ?? graph�� ������Ʈ �ϸ鼭 i -> j�� ���� ���� �ִ��� üũ, �� ��� �߽߰� 1 ����.
*/