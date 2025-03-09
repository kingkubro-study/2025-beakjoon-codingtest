#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

long long getWoodLength(vector<int>& woodVector, int height) {
	long long total = 0;
	for (int wood : woodVector) {
		if (wood > height) {
			total += (wood - height);
		}
	}
	return total;
}

int main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
	int N;
	long long M;
	cin >> N;
	cin >> M;

	vector<int> woodVector(N);
	for (int i = 0;i < N;i++) {
		cin >> woodVector[i];
	}

	int left = 0, right = *max_element(woodVector.begin(), woodVector.end());
	int H = 0;
	

	while (left <= right) {
		int mid = (left + right) / 2;
		long long woodLength = getWoodLength(woodVector, mid);

		if (woodLength >= M) {
			// 필요 높이보다 더 많으면 높이 올려보기
			H = mid;
			left = mid + 1;
		}
		else {
			// 더 필요함. 높이 낮추기
			right = mid - 1;
		}
	}
	

	cout << H;
	return 0;
}

/*
* 2805 나무 자르기 
* 나무 M미터 필요함. 
* 절단기에 높이 H 지정하기. 
* H보다 높이 크면 잘리고 작으면 안잘림. 
* 절단기에 설정할 수 있는 높이의 최댓값 구하기. 
* 높이는 1,000,000,000 보다 작거나 같은 양의 정수 또는 0. 
* 첫째 줄에 나무의수 N, 가져가려는 나무 길이 M
* 높이 최댓값 출력하기. 
* 가장 낮은 높이의 나무 높이부터 체크하고 더 필요하다면 아래로 내려가고 필요 없다면 H 올라가기. 
* => 이 방식은 H를 가장 작은 값 부터 시작해서 증가/감소가 비효율적이어서 O(N^2)로 느린 방법. 
* 이진탐색 사용하기. => O(N log MaxHeight)
* left와 right로 계산
* 
* 최댓값 찾을 때, sort하고 맨 마지막 벡터 값 가져오는 방식 보다 max_element가 더 빠름. O(N log N) vs O(N) 임. 
*/