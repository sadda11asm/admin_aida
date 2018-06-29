const router = require('express').Router()
const mysql = require('mysql2/promise')
// const async = require('async')
const dbconfig = require('../config/dbconfig')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

router.get('/:categoryId', async function (req, res, next) {
  let categoryId = req.params.categoryId
  try {
    if(!categoryId) throw new Error('Please select head category...')
    var db = await connect();
    let categories = await db.query('SELECT `id`,`name` \
         FROM `categories` \
         WHERE `is_actual` = 1 and `upcat` = ?', [categoryId])
    db.end();
    var fields = categories;
    console.log('*** subCategories ***')
    console.log(fields.length)
    if (!fields.length) {
      res.status(200).json({
        message: "subCategories empty",
        subCategories: fields
      })
    } 
    res.status(200).json({
      message: "subCategories",
      subCategories: categories[0]
    })
  } catch (error) {
    console.log(error.message)
    res.send(400, error.message)
  }
})
  // Create new category
router.post('/', (req, res, next) =>{
  let parentCategoryId = req.body.parentCategoryId
  let newCategoryName = req.body.name
  let isActual = req.body.status
  console.log(' ***  new category ***')
  console.log(req.body)
  try {
    if(isNaN(parentCategoryId)) throw new Error('New category must have parent category')
    if(!newCategoryName) throw new Error('New category must have *Name*')
    if(isNaN(isActual)|| !isActual || parseInt(isActual)>1) isActual = 1
      mysql.createConnection(dbconfig.dbDictionary)
      .then( async (conn) => {
        let newCategory = await conn.query('INSERT INTO categories(name, upcat, is_actual) \
        VALUES( ?, ?, ?)', [newCategoryName, parentCategoryId, isActual])
        return newCategory
      })
      .then(([fields]) => {
        console.log('*** New Category *** ')
        console.log(fields)
        res.status(201).json({
          message: 'new category creating',
          category: {
            categoryName: newCategoryName,
            parentCategoryId: parentCategoryId,
            status:isActual
          }
        })
      })
      .catch((err) => {
        console.log('*** error insert ***')
        console.log(err)
        res.send(400, err.message)
      })
  } catch (error) {
    console.log('*** error ***')
    console.log(error)
    res.send(400, error.message)
  }
})

// Edit Categories
router.patch('/:id', async function (req, res, next) {
  var id = req.params.id;
  console.log(req.params.id);
  let newCategoryName = req.body.name
  let parentCategoryId = req.body.parentCategoryId
  let isActual = req.body.status;
  try {
    var db = await connect();
    var newCategory = await db.query("UPDATE categories SET name = ?, upcat = ?, is_actual = ? WHERE id = ?", [newCategoryName, parentCategoryId, isActual, id])
    .catch((err) => {
        console.log('*** error insert ***')
        console.log(err)
        res.send(400, err.message)
    })
    res.status(201).json({
          message: 'category updating',
          category: {
            categoryName: newCategoryName,
            parentCategoryId: parentCategoryId,
            status:isActual
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
    var deleteCategory = await db.query('DELETE FROM categories WHERE id = ?', [id]);
    db.end();
    res.status(201).json({
          message: 'category deleting',
          category: {
            id: id
          }
        })
  } catch (err) {
    console.log(err);
    res.send(400, err.message);
  }
})



module.exports = router
