const router = require('express').Router()
const mysql = require('mysql2/promise')
const dbconfig = require('../config/dbconfig')
const ctrls = require('../controllers/valute')

// Create new product
router.post('/', async (req, res) => {
  try { 
    let result;
    let method = req.body.method
    if(!method) throw new Error("Route don't have method")
    switch(method.toUpperCase()) {
      case 'GET':
        console.log("information about valutes")
        result = await ctrls.getValutes()
        res.status(result.status).json(result)    
        break;
      case 'PATCH':
        console.log("update valute information")
        result = await ctrls.editValute(req.body.id, req.body.name)
        res.status(result.status).json(result)
        break;
      case 'DELETE':
        console.log("delete valute")
        result = await ctrls.dropValute(req.body.id)
        res.status(result.status).json(result)
        break;
      case 'POST':
        console.log('add a new valute')
        var newValuteName = req.body.name;
        result = await ctrls.addValute(newValuteName)
        res.status(result.status).json(result)
        break;
      default:
        res.status(404).json({error: "NO FOUND METHOD PROVIVED"});
        break;      
    }
  } catch(err) {
    console.log("*** error ***")
    console.log(err)
    res.status(401).json({"Error": err.message})
  }
  
})

module.exports = router
