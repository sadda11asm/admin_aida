  const router = require('express').Router()
const mysql = require('mysql2/promise')
// const async = require('async')
const dbconfig = require('../config/dbconfig')
const ctrls = require('../controllers/tails_type')

router.post('/', async function (req, res, next) {
  try { 
    let result;
    let method = req.body.method
    if(!method) throw new Error("Route don't have method")
    switch(method.toUpperCase()) {
      case 'GET':
        console.log("information about tails types")
        result = await ctrls.getTails()
        res.status(result.status).json(result)    
        break;
      case 'PATCH':
        console.log("update tails type information")
        result = await ctrls.editTails(req.body.id, req.body.name, req.body.description, req.body.attributes)
        res.status(result.status).json(result)
        break;
      case 'DELETE':
        console.log("delete tails type")
        result = await ctrls.dropTails(req.body.id);
        res.status(result.status).json(result)
        break;
      case 'POST':
        console.log('add a new tails type')
        result = await ctrls.addTails(req.body.name,req.body.description,req.body.attributes)
        res.status(result.status).json(result)
        break;
      default:
        res.json({status:404, message: "NO FOUND METHOD PROVIDED"});
        break;      
    }
  } catch(err) {
    console.log("*** error ***")
    console.log(err)
    res.json(400, {"Error": err.message})
  }
})




module.exports = router
