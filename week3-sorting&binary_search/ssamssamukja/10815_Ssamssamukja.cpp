#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
	int N, M;

	cin >> N;

	vector<int> Nvector(N);
	for (int i = 0;i < N;i++) {
		cin >> Nvector[i];
	}

	// 이진 탐색을 위해 정렬하기
	sort(Nvector.begin(), Nvector.end());

	cin >> M;
	vector<int> Mvector(M);

	for (int i = 0;i < M;i++) {
		cin >> Mvector[i];
	}

	// M배열과 N배열 위치 같은 거 값 비교 
	for (int i = 0;i < M;i++) {
		cout << binary_search(Nvector.begin(), Nvector.end(), Mvector[i]) << " ";
	}
	
	return 0;
}

/*
* 10815 숫자카드
* 숫자카드 N개 가지고 있음. 
* 정수 M개 주어졌을 때 상근이가 가지고 있는지 아닌지 구하기
* 첫째 줄 N : 숫자 카드 개수 주어지고(1 ~ 500,000)
* 둘째 줄 숫자카드 적혀있는 정수 주어지고 (-10,000,000 ~ 10,000,000)
* 셋째 줄 M 개수 주어짐. 
* 넷째 줄 : 숫자 카드인지 아닌지 구해야 할 M개 정수 주어짐. 공백으로 구분됨. (1~500000)
* 가지고 있으면 1, 없으면 0
* 
* 이진탐색 또는 unordered_set을 사용시 효율적인 검색 가능.
* vector<int> Nvector(N); 벡터의 크기를 알 수 있다면 미리 설정해주기
* 처음엔 Answer vector 하나 만들어주려고 했으나 그건 비효율적. 바로 출력하는 코드로 수정함.
*/