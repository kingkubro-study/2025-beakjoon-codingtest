def check(x, y, visited):
    for i in range(4):
        ax = x + dx[i]
        ay = y + dy[i]

        if (ax, ay) in visited:
            return False
    return True

def dfs(visited, total):
    global answer
    if total >= answer: return
    if len(visited) == 15:
        answer = min(answer, total)
    else:
        for i in range(1, n - 1):
            for j in range(1, n - 1):
                if check(i, j, visited) and (i, j) not in visited:
                    temp =[(i, j)]
                    temp_total = maps[i][j]
                    for idx in range(4):
                        ax = i + dx[idx]
                        ay = j + dy[idx]
                        temp_total += maps[ax][ay]
                        temp.append((ax, ay))
                    dfs(visited + temp, total + temp_total)
n = int(input())
# 상하좌우
dx = [1, -1, 0, 0]
dy = [0, 0, 1, -1]
result = []
maps = []
answer = int(1e9)

for _ in range(n):
    maps.append(list(map(int, input().split())))

dfs([], 0)

print(answer)
