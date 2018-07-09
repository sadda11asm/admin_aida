const router = require('express').Router()
const mysql = require('mysql2/promise')
const async = require('async')
const dbconfig = require('../config/dbconfig')
const ctrls = require('../controllers/unit')


router.post('/', async (req, res) => {
  // console.log(req.body)
  try { 
    let result;
    let method = req.body.method
    if(!method) throw new Error("Route don't have method")
    switch(method.toUpperCase()) {
      case 'GET':
        console.log("information about units")
        result = await ctrls.getUnit()
        res.status(result.status).json(result)    
        break;
      case 'PATCH':
        console.log("update upload type information")
        result = await ctrls.editUnit(req.body.id, req.body.name, req.body.type)
        res.status(result.status).json(result)
        break;
      case 'DELETE':
        console.log("delete upload type")
        result = await ctrls.dropUnit(req.body.id);
        res.status(result.status).json(result)
        break;
      case 'POST':
        console.log('add a new upload type')
        result = await ctrls.addUnit(req.body.name,req.body.type)
        res.status(result.status).json(result)
        break;
      default:
        res.send(404, "NONE OF THE METHODS PROVIDED");
        break;      
    }
  } catch(err) {
    console.log("*** error ***")
    console.log(err)
    res.json(400, {"Error": err.message})
  }
})

module.exports = router
