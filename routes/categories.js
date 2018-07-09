const router = require('express').Router()
const mysql = require('mysql2/promise')
// const async = require('async')
const dbconfig = require('../config/dbconfig')
const ctrls = require('../controllers/categories')
async function connect(){
    let conn = await mysql.createConnection(dbconfig.dbDictionary);
    return conn;
}

router.post('/', async function (req, res, next) {
  try {
    let method = req.body.method
    if(!method) throw new Error("REQUEST DON'T HAVE METHOD PROVIDED")
    switch(method.toUpperCase()) {
      case "GET":
        result = await ctrls.getCategories(categoryId)
        res.status(result.status).json(result)
        break;
      case "POST":
        result = await ctrls.addCategory(req.body.parentCategoryId, req.body.name, req.body.isActual);
        res.status(result.status).json(result)
        break;
      case "PATCH":
        result = await ctrls.editCategory(req.body.id, req.body.parentCategoryId, req.body.name, req.body.isActual);
        res.status(result.status).json(result)
        break;
      case "DELETE":
        result = await ctrls.deleteCategory(req.body.id)
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
