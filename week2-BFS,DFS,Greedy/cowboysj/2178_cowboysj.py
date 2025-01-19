import sys

# 입력 받기
N, M = map(int, sys.stdin.readline().split())
maze = [list(map(int, list(sys.stdin.readline().strip()))) for _ in range(N)]

# 이동 방향 
dx = [-1, 1, 0, 0]
dy = [0, 0, -1, 1]

def bfs():
    queue = [[0, 0]]  # (0,0)부터 시작
    while queue:
        x, y = queue.pop(0) 
        for i in range(4):  
            nx, ny = x + dx[i], y + dy[i]
            if 0 <= nx < N and 0 <= ny < M and maze[nx][ny] == 1:  
                maze[nx][ny] = maze[x][y] + 1  # 현재 위치 값 +1
                queue.append([nx, ny])  # 이동한 좌표 추가
    return maze[N-1][M-1]  # 도착점의 값 출력

print(bfs())
