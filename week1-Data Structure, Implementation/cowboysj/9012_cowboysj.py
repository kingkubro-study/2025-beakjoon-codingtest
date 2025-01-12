import sys
input = sys.stdin.readline
T = int(input())


for i in range(T):
    case = input().strip()
    left = 0
    for j in case:
        if (j == "("):
            left += 1
        else:
            left -= 1
            if (left < 0):
                print("NO")
                break
    else:  
        print("YES" if left == 0 else "NO")


