import sys

input = sys.stdin.readline

M, N = map(int, input().split())
space_list = [list(map(int, input().split())) for _ in range(M)]

new_space_list = []
for row in space_list:
    unique_sorted = {value: index for index, value in enumerate(sorted(set(row)))}
    new_space_list.append([unique_sorted[x] for x in row])

new_space_list.sort()

cnt, ans = 1, 0
for i in range(1, M):
    if new_space_list[i] == new_space_list[i - 1]:
        cnt += 1
    else:
        ans += cnt * (cnt - 1) // 2
        cnt = 1

ans += cnt * (cnt - 1) // 2
print(ans)
