from collections import deque
import sys

# 6방향: 위, 아래, 왼쪽, 오른쪽, 앞, 뒤
dx = [0, 0, 0, 0, 1, -1]
dy = [1, -1, 0, 0, 0, 0]
dz = [0, 0, 1, -1, 0, 0]

def bfs(M, N, H, farm):
    queue = deque()
    
    # 익은 토마토를 큐에 넣기
    for z in range(H):
        for y in range(N):
            for x in range(M):
                if farm[z][y][x] == 1:
                    queue.append((x, y, z, 0))  # (x, y, z, 날짜)
    
    max_day = 0
    
    while queue:
        x, y, z, day = queue.popleft()
        
        for i in range(6):
            nx, ny, nz = x + dx[i], y + dy[i], z + dz[i]
            if 0 <= nx < M and 0 <= ny < N and 0 <= nz < H and farm[nz][ny][nx] == 0:
                farm[nz][ny][nx] = 1  # 익은 토마토로 변경
                queue.append((nx, ny, nz, day + 1))  # 하루 증가
                max_day = max(max_day, day + 1)
    
    # 모든 토마토가 익었는지 확인
    for z in range(H):
        for y in range(N):
            for x in range(M):
                if farm[z][y][x] == 0:  # 하나라도 익지 않은 토마토가 있으면 -1
                    return -1
    
    return max_day

M, N, H = map(int, sys.stdin.readline().split())

farm = []

for i in range(H):
    layer = [list(map(int, sys.stdin.readline().split())) for i in range(N)]
    farm.append(layer)

result = bfs(M, N, H, farm)
print(result)


