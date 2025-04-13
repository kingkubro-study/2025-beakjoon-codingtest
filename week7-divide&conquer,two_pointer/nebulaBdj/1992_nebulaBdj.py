import sys
input = sys.stdin.readline
N = int(input())
board = []
for i in range(N):
  string = list(input().rstrip())
  board.append(string)

Quad_tree = []
def divide(a,b,N):
  tmp = board[a][b]
  for i in range(a,a+N):
    for j in range(b,b+N):
      if board[i][j] != tmp:
        Quad_tree.append('(')
        divide(a,b,N//2)
        divide(a,b+N//2,N//2)
        divide(a+N//2,b,N//2)
        divide(a+N//2,b+N//2, N//2)
        Quad_tree.append(')')
        return
  Quad_tree.append(tmp)

divide(0,0,N)
print(*Quad_tree,sep = "")