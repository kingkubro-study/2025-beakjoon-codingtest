#include <iostream>
#include <unordered_set>

using namespace std;

// 처음 A 원소 갯수, B 원소 갯수 받아
// A 배열 받아
// B 배열 받아
// 효율적 집합 연산을 위해 std::unordered_set 사용하기 : 중복 제거 / 빠른 검색 가능
// 삽입 삭제 탐색 O(1) 걸림. 그래서 O( A 원소 갯수 + B 원소 갯수)
int main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
	int aCount, bCount;
	cin >> aCount >> bCount;

	unordered_set<int> A, B;

	for (int i = 0;i < aCount;i++) {
		int source;
		cin >> source;
		A.insert(source);
	}

	for (int i = 0;i < bCount;i++) {
		int source;
		cin >> source;
		B.insert(source);
	}

	long minusSet = 0;

	for (int x : A) {
		if (B.find(x) == B.end()) {
			minusSet++;
		}
	}

	for (int x : B) {
		if (A.find(x) == A.end()) {
			minusSet++;
		}
	}

	cout << minusSet << endl;

	return 0;

}