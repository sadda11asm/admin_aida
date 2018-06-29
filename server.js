const http = require('http')
const app = require('./app')

// const port = process.env || 3030;
const port = 3030

const server = http.createServer(app)
server.listen(port, () => {
  console.log('Server listen port 3030 ...')
})
