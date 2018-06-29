const bcrypt = require('bcryptjs')
const mysql = require('mysql2/promise')
const async = require('async')

const dbconfig = require('../config/dbconfig')
exports = module.exports = {}

exports.getLogin = function (req, res) {
    if(req.signedCookies['panel']) {
      let panel = JSON.parse(req.singedCookies['panel'])
      if( typeof panel.uid !== 'undefined' &&
          typeof panel.pid !== 'undefined' &&
          panel.pid == '1m2r0ke178') {
        req.session.panel = panel
        return res.redirect('/')
      }
    }
    res.render('login')
}

exports.postLogin = function (req, res) {
		console.log('*** req  postLogin ***')
		console.log(req.body)
    let login = req.body.login
    let passwd = req.body.passwd
    try{
      if(!login) throw new Error('Login is required')
      if(!passwd) throw new Error('Password is required')
      mysql.createConnection(dbconfig.dbBilling)
      .then( async (conn) => {
        let check = await conn.query('SELECT `login`, `password` FROM `users` WHERE `login`= ?',[login])
        if(!check[0].length) throw new Error("This login doesn't exist")
        else {
          let passwdHash = check[0][0]["password"]
          console.log("Check password hash")
          if(!bcrypt.compareSync(passwd, passwdHash)) throw new Error('Wrong passwd, please try again')
          let userData = {}
          console.log('Hash is correct')
          userData.uid = login
          userData.pid = '1m2r0ke178'
          // req.session.panel = userData
          res.cookie('panel', JSON.stringify(userData), {
            singed: true,
            httpOnly: true,
            maxAge: 365*1000*24*120,
            path: '/',
          }).redirect('/')
        }
      })
      .catch(err => {
        console.log(err)
        res.status(401).json({
          message: err.message
        })
      })
    }
    catch(error){
      console.log(error)
      res.status(401).json({
        message: error.message
      })
    }
  }