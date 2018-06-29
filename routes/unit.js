const router = require('express').Router()
const mysql = require('mysql2/promise')
const async = require('async')
const dbconfig = require('../config/dbconfig')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

// Create New product
router.post('/', (req, res) => {
  console.log(req.body)
  let newUnitName = req.body.name
  let typeUnit = parseInt(req.body.type)
  try {
    if(!newUnitName) throw new Error('New Unit must have *name')
    if(!typeUnit) throw new Error('type is wrong')
    mysql.createConnection(dbconfig.dbDictionary)
    .then( async (conn) => {
      let searchUnit = await conn.query('SELECT `id`, `name` FROM `unit` \
      WHERE `name` = ? ', [newUnitName])
      if(searchUnit[0].length) throw new Error('This unit already exists')
      let newUnit = await conn.query('INSERT INTO `unit`(`name`, `type`) VALUES (?, ?) ', [newUnitName, typeUnit])
      conn.destroy()
      return newUnit
    })
    .then(([fields]) => {
      console.log('*** New unit *** ')
      console.log(fields)
      res.status(201).json({
        message: 'New unit creating',
        unit: {
          unitName: newUnitName,
          type: typeUnit
      	}
    	})
    })
    .catch( (err) => {
      console.log("*** New unit didn't create ***")
      console.log(err)
      res.send(400, err.message)
    })
  } catch(error) {
    console.log('***  New unit ***')
    res.send(400, error.message)
  }
})


router.patch('/:id', async function (req, res, next) {
  var id = req.params.id;
  var typeUnit = req.body.type
  console.log(req.params.id);
  let newUnitName = req.body.name
  try {
    var db = await connect();
    var newUnit = await db.query("UPDATE unit SET name = ?, type = ? WHERE id = ?", [newUnitName, typeUnit, id])
    .catch((err) => {
        console.log('*** error insert ***')
        console.log(err)
        res.send(400, err.message)
    })
    res.status(201).json({
          message: 'unit updating',
          unit: {
            name: newUnitName, 
            type: typeUnit
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
  // var type = req.body.type
  try {
    var db = await connect();
    var deleteUnit = await db.query('DELETE FROM unit WHERE id = ?', [id]);
    db.end();
    res.status(201).json({
          message: 'unit deleting',
          unit: {
            id: id
          }
        })
  } catch (err) {
    console.log(err);
    res.send(400, err.message);
  }
})

router.get('/:type', async function (req, res, next) {
  let type = req.params.type
  try {
    // if(!id) throw new Error('Please select unit if...')
    var db = await connect();
    let unit = await db.query('SELECT `id`,`name` \
         FROM `unit` \
         WHERE type = ?', [type])
    db.end();
    var fields = unit[0];
    // console.log('*** subCategories ***')
    // console.log(fields.length)
    if (!fields.length) {
      res.status(200).json({
        message: "unit empty",
        unit: fields
      })
    } 
    res.status(200).json({
      message: "unit list",
      unit: fields
    })
  } catch (error) {
    console.log(error.message)
    res.send(400, error.message)
  }
})

module.exports = router
