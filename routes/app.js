
// const ctrls = require('../controllers/login')

// Routes
const categories = require('./categories')
const product = require('./product')
const unit = require('./unit')
const attribute = require('./attribute')
const valute = require('./valute')
const cargo_type = require('./cargo_type')
const tails_type = require('./tails_type')
const upload_type = require('./upload_type')
const city = require('./city')
const region = require('./region')
const country = require('./country')
const companies = require('./companies')
const mailer = require('./nodemailer')
const documents = require('./documents')


module.exports = function(app) {
  // app.get('/login', ctrls.getLogin)
  // app.post('/login', ctrls.postLogin)


  // app.use((req, res, next) =>{
  //   console.log('****')
  //   console.log(req)
  //   try {
  //     if(!req.cookies['panel']) throw new Error("cookie is unsigned or doesn't exits")
  //     let panel = JSON.parse(req.signedCookies['panel'])
  //     if(typeof panel.pid !== "undefined" && panel.pid == "1m2r0ke178")
  //     req.session.panel = panel
  //     next()
  //   } catch(message){
  //     console.log('ERROR:', message)
  //     return res.redirect('/login')
  //   }
  // })

  app.get('/', function(req, res, next){
    res.render('index')
  })
  app.use('/categories', categories)
  app.use('/product', product)
  app.use('/unit', unit)
  app.use('/attribute', attribute)
  app.use('/valute', valute)
  app.use('/cargo_type', cargo_type)
  app.use('/tails_type', tails_type)
  app.use('/upload_type', upload_type)
  app.use('/region', region)
  app.use('/city', city)
  app.use('/country', country)
  app.use('/mailer', mailer)
  app.use('/documents', documents)
  // app.use('/companies', companies)

  app.use((req, res, next) => {
    const error = new Error('Not foundde')
    error.status = 404
    next(error)
  })
  app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
      error: {
        message: error.message
      }
    })
  })
}
