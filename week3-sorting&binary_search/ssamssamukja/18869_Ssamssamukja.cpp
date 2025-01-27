#include <iostream>
#include <vector>
#include <map>
#include <unordered_map>
#include <algorithm>
using namespace std;

vector<int> compress(vector<int>& arr) {
    vector<int> sortedArr = arr;
    sort(sortedArr.begin(), sortedArr.end());
    sortedArr.erase(unique(sortedArr.begin(), sortedArr.end()), sortedArr.end()); // 중복 제거

    vector<int> compressed;
    for (int num : arr) {
        compressed.push_back(lower_bound(sortedArr.begin(), sortedArr.end(), num) - sortedArr.begin());
    }
    return compressed;
}

int main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    int M, N;
    cin >> M >> N;

    unordered_map<string, int> universeCount;
    int result = 0;

    for (int i = 0; i < M; i++) {
        vector<int> planets(N);
        for (int j = 0; j < N; j++) {
            cin >> planets[j];
        }

        vector<int> compressedPlanets = compress(planets);

        string key;
        for (int num : compressedPlanets) {
            key += to_string(num) + ",";
        }

        result += universeCount[key];
        universeCount[key]++;
    }

    cout << result;
   
    return 0;
}

/*
* 18869 멀티버스 2
* M개의 우주, 1 ~ N 행성
* 행성의 크기를 알고 있어. 균등한 우주의 쌍이 몇 개? (구성이 같은데 순서만 다른 우주의 쌍은 한 번만 세기)
* 크기 순서가 같으면 우주를 균등하다고 한다. 
* 통일성 있게 만들어서 비교하여 같은 우주를 찾자. 
*/