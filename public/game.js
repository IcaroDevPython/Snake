export default function game() {
  const gameState = {
    players: {},
    foods: {},
    canvas: {
      wh: 30
    }
  }

  function addPlayer(id) {
    gameState.players[id] = [
        {x: 0, y: 1},
        {x: 1, y: 1},
        {x: 2, y: 1},
        {x: 3, y: 1},
        {x: 4, y: 1},
      ]

    console.log(gameState)
  }

  function delPlayer(id) {
    delete gameState.players[id]
  }

  function movePlayer(id, direction) {
    const player = gameState.players[id]
    if (player) {
    const head = player.at(-1)

    if (!direction) return
    const keyDirection = direction.toLowerCase()
    switch (keyDirection) {
        case "arrowright":
            if (head.x < gameState.canvas.wh - 1) {
                player.push({x: head.x + 1, y: head.y})
                player.shift()
            }
            break
        case "arrowleft":
            if (head.x > 0) {
                player.push({x: head.x - 1, y: head.y})
                player.shift()
            }
            break
        case "arrowup":
            if (head.y > 0) {
                player.push({x: head.x, y: head.y - 1})
                player.shift()
            }
            break
        case "arrowdown":
            if (head.y < gameState.canvas.wh - 1) {
                player.push({x: head.x, y: head.y + 1})
                player.shift()
            }

            break
    }
    }
  }

  return {
    addPlayer,
    delPlayer,
    gameState,
    movePlayer
  }
    }
