import sys

# 이동 방향 
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

sys.setrecursionlimit(10000)

def dfs(x, y, N, M, farm, visited):
    visited[x][y] = True
    for i in range(4):
        nx, ny = x + dx[i], y + dy[i]
        if 0 <= nx < N and 0 <= ny < M and not visited[nx][ny] and farm[nx][ny] == 1:
            dfs(nx, ny, N, M, farm, visited)

T = int(sys.stdin.readline())  

for i in range(T):
    # N : 가로 길이, M : 세로 길이, K : 배추 개수
    M, N, K = map(int, sys.stdin.readline().split())
    
    visited = [[False] * M for i in range(N)]  
    
    # 배추밭 초기화 (0: 배추 없음, 1: 배추 있음)
    farm = [[0] * M for i in range(N)]
    for j in range(K):
        x, y = map(int, sys.stdin.readline().split())
        farm[y][x] = 1
    
    # 지렁이 개수 
    worm_count = 0
    
    for i in range(N):
        for j in range(M):
            if farm[i][j] == 1 and not visited[i][j]:
                dfs(i, j, N, M, farm, visited)
                worm_count += 1 

    print(worm_count)


