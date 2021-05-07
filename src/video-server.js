/**Inspiration taken from https://softwareas.com/video-sync-with-websocket-and-node/ */
var ws = require('ws')
var userCount = []
let usersConnectedIpAddress = new Map()

var server = new ws.Server({ port: process.env.PORT || 3000 })

server.on('connection', function (conn) {
  server.broadcast('userCount ' + ++userCount)
  conn.on('message', function (message) {
    /*log('message logged' + message)
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
    }*/
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
