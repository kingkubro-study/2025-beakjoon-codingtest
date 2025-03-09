#include <iostream>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    int n;
    cin >> n;
    int n3;
    int n5 = n / 5;

    while (n5 >= 0) {
        int nn = n - n5 * 5;
        if (nn % 3 == 0) {
            cout << n5 + nn / 3;
            return 0;
        }
        n5--;
    }
    
    cout << -1;
    return 0;
}

/*
* 설탕배달
* n 킬로그램 배달.
* 3 / 5
* n이 주어지고 그걸 계산하여
* 봉지 최소 갯수 출력 (만들 수 없으면 -1)
* 5로 먼저 나눠 남은 걸로 3 나눠 3으로 떨어지는 가장 큰 5kg 개수 찾아야 함 << 이게 키포인트였음
*/