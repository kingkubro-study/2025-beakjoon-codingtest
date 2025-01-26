class Room {
  constructor(minLevel, maxLevel, capacity) {
    this.minLevel = minLevel;
    this.maxLevel = maxLevel;
    this.capacity = capacity;
    this.players = [];
  }

  canJoin(playerLevel) {
    return (
      this.players.length < this.capacity &&
      playerLevel >= this.minLevel &&
      playerLevel <= this.maxLevel
    );
  }

  addPlayer(player) {
    this.players.push(player);
  }

  isStarted() {
    return this.players.length === this.capacity;
  }

  sortPlayers() {
    this.players.sort((a, b) => a.nickname.localeCompare(b.nickname));
  }
}

function matchPlayers(p, m, playerData) {
  const rooms = [];

  playerData.forEach(({ level, nickname }) => {
    let roomFound = false;

    for (const room of rooms) {
      if (room.canJoin(level)) {
        room.addPlayer({ level, nickname });
        roomFound = true;
        break;
      }
    }

    if (!roomFound) {
      const newRoom = new Room(level - 10, level + 10, m);
      newRoom.addPlayer({ level, nickname });
      rooms.push(newRoom);
    }
  });

  rooms.forEach((room) => room.sortPlayers());

  return rooms;
}

function formatRooms(rooms) {
  return rooms
    .map((room) => {
      const status = room.isStarted() ? "Started!" : "Waiting!";
      const playersInfo = room.players
        .map((player) => `${player.level} ${player.nickname}`)
        .join("\n");
      return `${status}\n${playersInfo}`;
    })
    .join("\n");
}

const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

const [p, m] = input[0].split(" ").map(Number);
const playerData = input.slice(1).map((line) => {
  const [level, nickname] = line.split(" ");
  return { level: Number(level), nickname };
});

const rooms = matchPlayers(p, m, playerData);
console.log(formatRooms(rooms));
