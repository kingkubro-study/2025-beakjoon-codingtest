import sys
input = list(sys.stdin.readline().strip())

open_round = 0  
open_square = 0  
score = 0 

temp = 1 

for i in range(len(input)):
    char = input[i]

    if char == "(":
        open_round += 1
        temp *= 2
    elif char == "[":
        open_square += 1
        temp *= 3
    elif char == ")":
        if open_round == 0 or input[i - 1] not in "([":
            score = 0
            break
        if input[i - 1] == "(":
            score += temp
        open_round -= 1
        temp //= 2
    elif char == "]":
        if open_square == 0 or input[i - 1] not in "([":
            score = 0
            break
        if input[i - 1] == "[":
            score += temp
        open_square -= 1
        temp //= 3

if open_round != 0 or open_square != 0:
    score = 0

print(score)
