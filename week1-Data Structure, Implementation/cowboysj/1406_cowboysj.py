import sys

input = sys.stdin.readline

left_stack = list(input().strip())  
right_stack = []

M = int(input().strip())

for i in range(M):
    command = input().strip()
    if command == "L":  
        if left_stack:
            right_stack.append(left_stack.pop())
    elif command == "D":  
        if right_stack:
            left_stack.append(right_stack.pop())
    elif command == "B":  
        if left_stack:
            left_stack.pop()
    elif command.startswith("P"):  
        i, char = command.split()
        left_stack.append(char)


print("".join(left_stack + list(reversed(right_stack))))

