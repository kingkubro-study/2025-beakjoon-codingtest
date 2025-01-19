import sys
input = sys.stdin.readline
T = int(input())

for i in range(T):
    N = int(input())
    total = []
    for j in range(N):
        a, b = map(int, input().split())
        total.append((a, b))

    total.sort(key=lambda x: x[0])
    count = 1
    check = total[0][1]
    for i in range(1, N):
        if total[i][1] < check:
            check = total[i][1]
            count += 1
    print(count)