const router = require('express').Router()
const mysql = require('mysql2/promise')
// const async = require('async')
const dbconfig = require('../config/dbconfig')
const ctrls = require('../controllers/upload_type')

router.post('/', async function (req, res, next) {
  try { 
    let result;
    let method = req.body.method
    if(!method) throw new Error("Route don't have method")
    switch(method.toUpperCase()) {
      case 'GET':
        console.log("information about upload types")
        result = await ctrls.getUpload()
        res.status(result.status).json(result)    
        break;
      case 'PATCH':
        console.log("update upload type information")
        result = await ctrls.editUpload(req.body.id, req.body.name, req.body.description, req.body.attributes)
        res.status(result.status).json(result)
        break;
      case 'DELETE':
        console.log("delete upload type")
        result = await ctrls.dropUpload(req.body.id);
        res.status(result.status).json(result)
        break;
      case 'POST':
        console.log('add a new upload type')
        result = await ctrls.addUpload(req.body.name,req.body.description,req.body.attributes)
        res.status(result.status).json(result)
        break;
      default:
        res.send(404, "NO FOUND METHOD PROVIVED");
        break;      
    }
  } catch(err) {
    console.log("*** error ***")
    console.log(err)
    res.json(400, {"Error": err.message})
  }
})




module.exports = router
