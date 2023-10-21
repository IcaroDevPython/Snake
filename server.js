import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import game from './public/game.js'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

const gameServer = game()

app.use(express.static('public'))

sockets.on('connection', (socket) => {
    const playerId = socket.id
    gameServer.addPlayer(playerId)
    socket.emit('setup', gameServer.gameState)
    console.log(`> Player connected: ${playerId}`)

    socket.on('state', () => {
      socket.emit('setup', gameServer.gameState)
    })

    socket.on('setPos', (direction) => {
      gameServer.movePlayer(socket.id, direction)
    })

    socket.on('disconnect', () => {
      gameServer.delPlayer(socket.id)
      console.log('Player Removed')
    })
})

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`)
})
