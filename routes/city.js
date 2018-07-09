const router = require('express').Router()
const mysql = require('mysql2/promise')
// const async = require('async')
const dbconfig = require('../config/dbconfig')
const ctrls = require('../controllers/city')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}
  // Create new category
router.post('/', async function (req, res, next) {
  try {
    let method = req.body.method
    if(!method) throw new Error("REQUEST DON'T HAVE METHOD PROVIDED")
    switch(method.toUpperCase()) {
      case "GET":
        result = await ctrls.getCities(req.body.countryId)
        res.status(result.status).json(result)
        break;
      case "POST":
        result = await ctrls.addCity(req.body.countryId, req.body.name, req.body.code);
        res.status(result.status).json(result)
        break;
      case "PATCH":
        result = await ctrls.editCity(req.body.id, req.body.countryId, req.body.name, req.body.code);
        res.status(result.status).json(result)
        break;
      case "DELETE":
        result = await ctrls.deleteCity(req.body.id)
        res.status(result.status).json(result)
        break;
    }
  } catch (err) {
    console.log("*** error ***")
    console.log(err)
    res.send(400, "Error" + err.message)
  }
})


module.exports = router
