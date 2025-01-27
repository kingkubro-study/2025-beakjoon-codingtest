#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;


int getNumLines(long long lineLength, vector<long long>& lineVector) {
	int nums = 0;
	for (long long cable : lineVector) {
		nums += cable / lineLength;
	}
	return nums;
}

int main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
	int K;
	int N;
	cin >> K;
	cin >> N;
	vector<long long> lineVector(K);

	for (int i = 0;i < K;i++) {
		cin >> lineVector[i];
	}
	long long left = 1, right = *max_element(lineVector.begin(), lineVector.end());
	long long answer = 0;

	while (left <= right) {
		long long mid = (left + right) / 2;
		int lineNums = getNumLines(mid, lineVector);

		if (lineNums >= N) {
			// 필요 개수보다 더 많으면 높이 올려보기
			answer = mid;
			left = mid + 1;
		}
		else {
			// 더 필요함. 높이 낮추기
			right = mid - 1;
		}
	}

	cout << answer << '\n';
	return 0;
}

/*
* 1654 랜선 자르기
* K개의 랜선. 길이 제각각. (1~10000)
* N개의 같은 길이의 랜선으로 만들고 싶음. (1 ~ 1,000,000)
* 이분탐색으로 최소 길이, 최대길이 mid값으로 탐색하기.
* 최대 길이는 랜선 최대 길이. 
*/