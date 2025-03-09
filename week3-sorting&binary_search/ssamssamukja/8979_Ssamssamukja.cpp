#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Country {
	int id, gold, silver, bronze;
};

bool compare(const Country& a, const Country& b) {
	if (a.gold != b.gold) return a.gold > b.gold;
	if (a.silver != b.silver) return a.silver > b.silver;
	return a.bronze > b.bronze;
}

int main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);

	int N, K;
	cin >> N >> K;

	vector<Country> countries(N);

	for (int i = 0; i < N; i++) {
		cin >> countries[i].id >> countries[i].gold >> countries[i].silver >> countries[i].bronze;
	}

	sort(countries.begin(), countries.end(), compare);

	// 초기값
	int rank = 1;
	int prev_gold = countries[0].gold, prev_silver = countries[0].silver, prev_bronze = countries[0].bronze;

	for (int i = 0; i < N; i++) {
		// 이전 국가와 메달 개수가 다르면 새로운 등수 적용
		if (countries[i].gold != prev_gold || countries[i].silver != prev_silver || countries[i].bronze != prev_bronze) {
			rank = i + 1;
		}

		// 국가 K를 찾으면 등수 출력
		if (countries[i].id == K) {
			cout << rank;
			return 0;
		}


		// 이전 값 업데이트
		prev_gold = countries[i].gold;
		prev_silver = countries[i].silver;
		prev_bronze = countries[i].bronze;
	}
}

/*
* 8979 올림픽
* 금메달 수 많음 / 같으면 은메달 많음 / 금은 같으면 동메달 많음
* 다 같으면 등수 같음. 
* 국가 수 N(1~1000), 알고 싶은 국가 K(1~N) 
* 메달 수 총합은 1,000,000 이하. 
* 구조체로 만들어서 한 국가 정보 가지고 있는 벡터 만들기. 그걸로 정렬 수행. 
* 동점 등수면 이전 등수 쓰고, 앞에 동점 등수였어. 달라. 그러면 현재 위치대로 등수임. 
* 
* 여러 정보를 가지고 있는데 다 써야 해. => 구조체 만들어서 사용하기. 
* sort(countries.begin(), countries.end(), compare); boolean 값 반환하는 함수로 sort 하기.
*/