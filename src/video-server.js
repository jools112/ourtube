var ws = require('ws')
var userCount = []
let usersConnectedIpAddress = new Map()

var server = new ws.Server({ port: process.env.PORT || 3000 })

server.on('connection', function (conn) {
  server.broadcast('userCount ' + ++userCount)
  conn.on('message', function (message) {
    server.broadcast(message)
  })
})

server.on('close', function (conn) {
  server.broadcast('userCount ' + --userCount)
})

function log(msg) {
  console.log(+new Date() + ' - ' + msg.toString())
}

server.broadcast = (msg) => {
  log(msg)
  server.clients.forEach((c) => c.send(msg))
}
