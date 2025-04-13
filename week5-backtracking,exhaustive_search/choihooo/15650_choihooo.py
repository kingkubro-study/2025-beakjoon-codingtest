def dfs(start, depth, N, M, result):
    if depth == M:
        print(' '.join(map(str, result)))
        return
    
    for i in range(start, N + 1):
        result.append(i)
        dfs(i + 1, depth + 1, N, M, result)
        result.pop()

def solve(N, M):
    dfs(1, 0, N, M, [])

if __name__ == "__main__":
    N, M = map(int, input().split())
    solve(N, M)
