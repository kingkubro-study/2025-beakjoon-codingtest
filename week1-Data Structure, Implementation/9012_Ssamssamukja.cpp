#include <iostream>
#include <stack>
#include <string>

using namespace std;

bool isVPS(const string& vps) {
    stack<char> stk;

    for (char ch : vps) {
        if (ch == '(') { //여는 괄호
            stk.push(ch);
        }
        else if (ch == ')') { // 닫는 괄호
            if (stk.empty()) { // 비어있다면 VPS 아님
                return false;
            }
            stk.pop(); // 스택에서 여는 괄호 제거
        }
    }

    // 스택이 비어있으면 VPS, 아니면 VPS가 아님
    return stk.empty();
}

int main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
	int T;
	cin >> T;

    while (T--) {
        string vps;
        cin >> vps;

        if (isVPS(vps)) {
            cout << "YES\n";
        }
        else {
            cout << "NO\n"
        }
    }

    return 0;
}


/* ( ) 문자열
* 한 쌍의 괄호 기호 문자열은 기본 VPS.
* x가 VPS => 하나의 괄호에 넣은 새로운 문자열 (x) 도 VPS
* VPS인 x와 y 접합 시킨 새로운 문자열 xy 도 VPS
* 입력 괄호 문자열이 VPS이냐 아니냐 YES / NO 판별하기
* 
* 입력 >> T개의 테스트 데이터. 입력 첫 줄에 입력 데이터 수 나타내는 정수 T 주어짐.
* 
* 첫번째 숫자만큼 배열 받음. 
* 스택 사용. 이런 괄호 문자열이면 대부분 스택사용 ?? 짝 이루면 pop ..
* 
* ( => 스택 추가. 
* ) => pop으로 짝 맞춤. 
* 
* VPS인지 확인하는데 스택 이용해서.
* 
*/