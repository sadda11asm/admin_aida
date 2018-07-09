const router = require('express').Router()
const mysql = require('mysql2/promise')
const async = require('async')
const dbconfig = require('../config/dbconfig')
const ctrls = require('../controllers/product')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

// Create new product
router.post('/', async (req, res) => {
  try { 
    let result;
    let method = req.body.method
    if(!method) throw new Error("Route don't have method")
    switch(method.toUpperCase()) {
      case 'GET':
        console.log("information about product")
        result = await ctrls.getProduct()
        res.status(result.status).json(result)    
        break;
      case 'PATCH':
        console.log("update product information")
        result = await ctrls.editProduct(req.body.id, req.body.name)
        res.status(result.status).json(result)
        break;
      case 'DELETE':
        console.log("delete product")
        result = await ctrls.dropProduct(req.body.id);
        res.status(result.status).json(result)
        break;
      case 'POST':
        console.log('add a new product')
        result = await ctrls.addProduct(req.body.name)
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
