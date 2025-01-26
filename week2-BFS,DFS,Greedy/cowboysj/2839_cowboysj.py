import sys
input = sys.stdin.readline

N = int(input())  

# 최대 5킬로그램 봉지를 사용하면서 나머지를 3킬로그램 봉지로 채워야됨
#봉지 개수
count = 0 

while N >= 0:
    if N % 5 == 0:  
        count += N // 5  
        print(count)
        break
    N -= 3  # 5킬로그램 봉지가 안되면 3킬로그램 봉지 하나를 뺌
    count += 1  

else:
    print(-1)  
