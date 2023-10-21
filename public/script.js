export default function init() {
  const canvas = document.getElementById("cvs")
  const ctx = canvas.getContext('2d')
  const socket = io()
  let wh = null
  let direction = null

  let gameState = null

  function drawPlayers(id) {
    ctx.clearRect(0, 0, wh, wh)
    for (const playerId in gameState.players){
        ctx.fillStyle = "#fff"
        if (playerId == id) {
            ctx.fillStyle = "#0a9bfd"
        }
        const player = gameState.players[playerId]
        player.forEach((partBody, index) => {
            if (index === player.length - 1) ctx.fillStyle = "#000"
            ctx.fillRect(partBody.x, partBody.y, 1, 1)
        })
    }
}

  function touchMove() {
    let startX, startY;

    canvas.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    canvas.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const deltaX = startX - endX;
        const deltaY = startY - endY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            direction = deltaX > 0 ? "ArrowLeft": "ArrowRight";
        } else {
            direction = deltaY > 0 ? "ArrowUp" : "ArrowDown";
        }
       });
    }

  function keyBoardMove() {
    document.addEventListener('keydown', (keyPressed) => {
        direction = keyPressed
    })
}

  function setup() {
    socket.on('setup', (state) => {
      gameState = state
      canvas.width = gameState.canvas.wh
      canvas.height = gameState.canvas.wh
    })
    socket.on('connect', () => {
      console.log(socket.id)
      touchMove()
      keyBoardMove()
      //setTimeout(() => {
      setInterval(() => {
        drawPlayers(socket.id)
        socket.emit('setPos', direction)
        socket.emit('state')
      }, 250)
      //}, 1000)
    })
  }
  
  return {
    setup
  }
                        }
