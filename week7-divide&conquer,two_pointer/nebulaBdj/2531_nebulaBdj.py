n,d,k,c = map(int, input().split())
plate = []
for i in range(n):
    plate.append(int(input()))

max_sushi = 0

for i in range(n):
    if i <= n-k:
        tmp = set(plate[i:i+k])
    else:
        tmp = set(plate[i:])
        tmp.update(plate[:(i+k)%n]) 

        tmp.add(c)
        max_sushi = max(max_sushi, len(tmp))

print(max_sushi)