const router = require('express').Router()
const mysql = require('mysql2/promise')
const dbconfig = require('../config/dbconfig')
const async = require('async')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

// Create new attribute
router.post('/', async function (req, res) {
  let newAttributeName = req.body.name
  try {
    if(!newAttributeName)  throw new Error('New attribute must have *name') 
    mysql.createConnection(dbconfig.dbDictionary)
    var db = await connect();
    let searchAttribute = await db.query('SELECT `name` FROM `attribute` WHERE `name` = ?', [newAttributeName])
    if(searchAttribute[0].length) throw new Error('This attribute already exits')
    let newAttribute = await db.query('INSERT INTO `attribute`(`name`) VALUES (?) ', [newAttributeName])
    db.end()
    var fields = newAttribute
    console.log(fields)
    console.log('***  Attribute ***')
    res.status(201).json({
      message: 'New attribute creating',
      attribute: {
        attributeName: newAttributeName
      }
    })
  } catch(error) {
    console.log('*** error new attribute  ***')
    res.send(400, error.message)
  }
})

router.patch('/:id', async function (req, res, next) {
  var id = req.params.id;
  console.log(req.params.id);
  let newAttributeName = req.body.name
  try {
    var db = await connect();
    var newAttribute = await db.query("UPDATE attribute SET name = ? WHERE id = ?", [newAttributeName, id])
    .catch((err) => {
        console.log('*** error insert ***')
        console.log(err)
        res.send(400, err.message)
    })
    res.status(201).json({
          message: 'attribute updating',
          attribute: {
            name: newAttributeName
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
    var deleteAttribute = await db.query('DELETE FROM attribute WHERE id = ?', [id]);
    db.end();
    res.status(201).json({
          message: 'attribute deleting',
          attribute: {
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
    // if(!id) throw new Error('Please select attribute if...')
    var db = await connect();
    let attributes = await db.query('SELECT `id`,`name` \
         FROM `attribute` \
         WHERE id >0')
    db.end();
    var fields = attributes[0];
    // console.log('*** subCategories ***')
    // console.log(fields.length)
    if (!fields.length) {
      res.status(200).json({
        message: "attributes empty",
        attributes: fields
      })
    } 
    res.status(200).json({
      message: "attributes list",
      attributes: fields
    })
  } catch (error) {
    console.log(error.message)
    res.send(400, error.message)
  }
})
module.exports = router
