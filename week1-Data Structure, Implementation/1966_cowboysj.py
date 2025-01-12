import sys

T = int(sys.stdin.readline())

for i in range(T):
    n, m = map(int, sys.stdin.readline().split())
    data = list(map(int, sys.stdin.readline().split()))

    queue = [(data[i], i) for i in range(n)]
    result = 0

    while queue:
        current = queue.pop(0)

        if any(current[0] < doc[0] for doc in queue):
            queue.append(current)
        else:
            result += 1
            if current[1] == m:
                print(result)
                break
