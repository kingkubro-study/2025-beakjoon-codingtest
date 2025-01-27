import sys
input = sys.stdin.read

data = input().splitlines()
N, M = map(int, data[0].split())
heard = set(data[1:N+1])  # 듣도 못한 사람
seen = set(data[N+1:])    # 보도 못한 사람

# 교집합 구하기
result = sorted(heard & seen)

print(len(result))
print('\n'.join(result))
