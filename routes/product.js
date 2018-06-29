const router = require('express').Router()
const mysql = require('mysql2/promise')
const async = require('async')
const dbconfig = require('../config/dbconfig')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

// Create new product
router.post('/', (req, res) => {
  let newProductName = req.body.name
  try {
    if(!newProductName) throw new Error('New Product must have *name')
    mysql.createConnection(dbconfig.dbDictionary)
    .then( async (conn) => {
      let searchProduct = await conn.query('SELECT `id`, `name` FROM `product` \
      WHERE `name` = ? ', [newProductName])
      if(searchProduct[0].length) throw new Error('This product already exist')
      let newProduct = await conn.query('INSERT INTO `product`(`name`) VALUES(?)', [newProductName])
      conn.destroy()
      return newProduct
    })
    .then((newProduct) => {
      console.log('*** new product ***')
      console.log(newProduct)
      res.status(201).json({
        message: 'New product creating',
        product: {
          productName: newProductName
        }
      })
    })
    .catch((err) => {
      console.log("*** New product didn't create ***")
      console.log(err)
      res.send(400, err.message)
    })
  } catch(error) {
    console.log('***  New Product ***')
    res.send(400, error.message)
  }
})

router.patch('/:id', async function (req, res, next) {
  var id = req.params.id;
  console.log(req.params.id);
  let newProductName = req.body.name
  try {
    var db = await connect();
    var newProduct = await db.query("UPDATE product SET name = ? WHERE id = ?", [newProductName, id])
    .catch((err) => {
        console.log('*** error insert ***')
        console.log(err)
        res.send(400, err.message)
    })
    res.status(201).json({
          message: 'Product updating',
          product: {
            name: newProductName
          }
        })
    db.end();
  } catch(error){
    console.log(error)
    res.send(400, error.message)
  }
})

router.delete('/:id', async function (req, res, next) {
  var id = req.params.id;
  try {
    var db = await connect();
    var deleteProduct = await db.query('DELETE FROM product WHERE id = ?', [id]);
    db.end();
    res.status(201).json({
          message: 'Product deleting',
          product: {
            id: id
          }
        })
  } catch (err) {
    console.log(err);
    res.send(400, err.message);
  }
})

router.get('/', async function (req, res, next) {
  // let id = req.params.id
  try {
    // if(!id) throw new Error('Please select Product if...')
    var db = await connect();
    let products = await db.query('SELECT `id`,`name` \
         FROM `product` \
         WHERE id >0')
    db.end();
    var fields = products[0];
    // console.log('*** subCategories ***')
    // console.log(fields.length)
    if (!fields.length) {
      res.status(200).json({
        message: "Products empty",
        products: fields
      })
    } 
    res.status(200).json({
      message: "Products list",
      products: fields
    })
  } catch (error) {
    console.log(error.message)
    res.send(400, error.message)
  }
})
module.exports = router
