const path = require('path')
const morgan = require('morgan')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.set('views',path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static('/var/www/aida/cdn/documents/'))
app.use(morgan('dev'))

app.use(cookieParser('adminPanel'))
// app.use(session({
//   secret: 'admin',
//   resave: false, 
//   saveUninitialized: true,
//   domain: "localhost"
// }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ parameterLimit: 100000,
limit: '50mb',
extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  if(req.method == "OPTIONS") {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

const setRoutes = require('./routes/app')
setRoutes(app)

module.exports = app
