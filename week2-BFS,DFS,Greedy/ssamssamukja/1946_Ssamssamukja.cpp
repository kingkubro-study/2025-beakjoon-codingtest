#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;
int main() {
	ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL);
    int T;
    cin >> T;

    while (T--) {
        int N;
        cin >> N; 

        vector<pair<int, int>> applicants(N);
        for (int i = 0; i < N; i++) {
            cin >> applicants[i].first >> applicants[i].second;
        }

        sort(applicants.begin(), applicants.end());

        int count = 1; 
        int minInterviewRank = applicants[0].second; 

        for (int i = 1; i < N; i++) {
            if (applicants[i].second < minInterviewRank) {
                count++;
                minInterviewRank = applicants[i].second;
            }
        }

        cout << count << "\n";
    }

    return 0;
}


/*
* 1946 신입 사원
* 서류와 면접 둘 중 하나가 다른 지원자보다 떨어지지 않는 자만 선발한다. 
* 
* 테스트 케이스 T(1<=T<=20)와 각 테스트 케이스마다 지원자 수 N을 입력 받고
* 지원자들의 서류 심사 순위와 면접 순위를 저장
* 최대 인원수를 한 줄에 하나씩 출력
*/