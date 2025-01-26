import sys

num_meetings = int(input())  # 회의 수

last_end_time = 0
max_meetings = 0  

meetings = []

for i in range(num_meetings):
    start, end = map(int, sys.stdin.readline().rstrip().split())
    meetings.append([start, end])

meetings.sort(key=lambda x: (x[1], x[0])) 

for start, end in meetings:
    if last_end_time <= start:  
        max_meetings += 1
        last_end_time = end 

print(max_meetings)
