import sys

input = sys.stdin.readline
N, M = map(int, input().split()) 
targets = list(map(int, input().split()))  

queue = [i for i in range(1, N + 1)]  
total_operations = 0 

for target in targets:
    target_index = queue.index(target)
    left_operations = target_index
    right_operations = len(queue) - target_index

    if left_operations <= right_operations:
        total_operations += left_operations
        queue = queue[left_operations:] + queue[:left_operations]
    else:
        total_operations += right_operations
        queue = queue[-right_operations:] + queue[:-right_operations]

    queue.pop(0)

print(total_operations)