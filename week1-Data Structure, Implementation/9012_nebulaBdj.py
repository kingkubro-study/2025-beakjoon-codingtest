T = int(input())

parenthesesArr = []

for _ in range(T):
  p = input().strip()
  parenthesesArr.append(p)

results = []

for ps in parenthesesArr:
  right = 0
  vaild = True
  for p in ps:
    if p == "(":
      right += 1
    elif p == ")":
      right -= 1
    if right < 0:
      vaild = False
      break
  
  if vaild and right == 0:
    results.append("YES")
  else:
    results.append("NO")
  
for result in results:
  print(result)