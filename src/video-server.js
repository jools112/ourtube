/**Inspiration taken from https://softwareas.com/video-sync-with-websocket-and-node/ */
var ws = require('ws')
var userCount = []
let usersConnectedIpAddress = new Map()
let usersConnectedUserName = new Map()

var server = new ws.Server({ port: process.env.PORT || 3000 })

server.on('connection', function (conn) {
  conn.on('message', function (message) {
    log('message logged ' + message)
    if (message.includes('ipaddress')) {
      let ipAddress = message.split(':')[1]
      log('ipAddress console log' + ipAddress)
      if (!usersConnectedIpAddress.has(ipAddress)) {
        usersConnectedIpAddress.set(ipAddress)
        server.broadcast('userCount ' + ++userCount)
      } else {
        server.broadcast('userCount ' + userCount)
      }
      return
    } else if (message.includes('username')) {
      let username = message.split(':')[1]
      if (!usersConnectedUserName.has(username)) {
        usersConnectedUserName.set(username)
      }
    }
    server.broadcast(message)
    server.broadcast(
      'username ' + Array.from(usersConnectedUserName.keys()).toString()
    )
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
