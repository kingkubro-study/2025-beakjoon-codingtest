#include<iostream>
#include<algorithm>
#include<vector>
#include<string>
#include<map>

using namespace std;

int main() {
	ios_base::sync_with_stdio(false);cin.tie(NULL);cout.tie(NULL);
	int N, M;
	cin >> N >> M;
	cin.ignore();
	map<string, int> mp;
	vector<string> ans;
	for (int i = 0;i < N + M;i++) {
		string str;
		cin >> str;
		mp[str]++;
		cin.ignore();
	}
	for (auto it : mp) {
		if (it.second > 1) {
			ans.push_back(it.first);
		}
	}
	sort(ans.begin(), ans.end());
	cout << ans.size() << "\n";
	for (auto it : ans) {
		cout << it << "\n";
	}
}