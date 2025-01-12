import sys

p, m = map(int, sys.stdin.readline().split())
players = []

for i in range(p):
    l, n = sys.stdin.readline().split()
    players.append([int(l), n])

rooms = []

for level, nickname in players:
    matched = False

    for room in rooms:
        room_level = room[0]
        room_players = room[1]

        if abs(room_level - level) <= 10 and len(room_players) < m:
            room_players.append([level, nickname])
            matched = True
            break

    if not matched:
        rooms.append([level, [[level, nickname]]])

for room in rooms:
    room_level = room[0]
    room_players = room[1]

    if len(room_players) == m:
        print("Started!")
    else:
        print("Waiting!")

    for player in sorted(room_players, key=lambda x: x[1]):
        print(player[0], player[1])
