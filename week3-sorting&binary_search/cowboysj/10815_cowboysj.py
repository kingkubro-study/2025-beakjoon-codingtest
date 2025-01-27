import sys
input = sys.stdin.read

data = input().splitlines()
N = int(data[0])
cards = set(map(int, data[1].split()))
M = int(data[2])
checks = list(map(int, data[3].split()))

result = [1 if check in cards else 0 for check in checks]

print(' '.join(map(str, result)))
