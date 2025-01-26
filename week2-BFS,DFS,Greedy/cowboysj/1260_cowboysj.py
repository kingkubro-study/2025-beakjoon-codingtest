import sys

# N : 정점의 개수, M : 간선의 개수, V : 시작 정점
N, M, V = map(int, sys.stdin.readline().split())

# 인접 행렬 생성
graph = [[0] * (N + 1) for _ in range(N + 1)]
for _ in range(M):
    a, b = map(int, sys.stdin.readline().split())
    graph[a][b] = graph[b][a] = 1  

# 방문 리스트 초기화
visited_dfs = [0] * (N + 1)  # DFS 방문 리스트
visited_bfs = [0] * (N + 1)  # BFS 방문 리스트

# DFS (스택 사용)
def dfs(V):
    stack = [V]  # 스택 초기화
    while stack:
        node = stack.pop()  # 스택에서 마지막 노드 꺼내기
        if not visited_dfs[node]:  
            visited_dfs[node] = 1  # 방문 처리
            print(node, end=' ')
            # 방문 가능한 노드를 내림차순으로 스택에 추가 (작은 번호가 나중에 push되어 먼저 방문)
            for i in range(N, 0, -1):
                if graph[node][i] == 1 and not visited_dfs[i]:
                    stack.append(i)

# BFS (리스트를 활용한 큐)
def bfs(V):
    queue = [V]  # 큐 초기화
    visited_bfs[V] = 1  # 방문 처리
    while queue:
        node = queue.pop(0)  # 리스트의 첫 번째 원소 제거 (FIFO)
        print(node, end=' ')
        for i in range(1, N + 1):  # 작은 정점부터 방문
            if graph[node][i] == 1 and visited_bfs[i] == 0:
                queue.append(i)
                visited_bfs[i] = 1  # 방문 처리

dfs(V)
print()
bfs(V)
