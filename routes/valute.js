const router = require('express').Router()
const mysql = require('mysql2/promise')
const dbconfig = require('../config/dbconfig')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

// Create new product
router.post('/', (req, res) => {
  let newValuteName = req.body.name
  try {
    if(!newValuteName) throw new Error('New valute must have *name')
    mysql.createConnection(dbconfig.dbDictionary)
    .then( async (conn) => {
      let searchValute = await conn.query('SELECT `name` FROM `valute` WHERE `name` = ?', [newValuteName])
      if(searchValute[0].length) throw new Error('This valute already exists')
      let newValute = conn.query('INSERT INTO valute(name) VALUES (?) ', [newValuteName])
      return newValute
    })
    .then(([fields]) => {
      console.log('*** newValute ***')
      console.log(fields)
      res.status(201).json({
        message: 'New valute creating',
        valute: {
          valuteName: newValuteName
        }
      })
    })
    .catch((err) => {
      console.log(err)
      res.send(400, err.message)
    })
  } catch(error) {
    console.log(error.message)
    res.send(400, error.message)
  }
})


router.patch('/:id', async function (req, res, next) {
  var id = req.params.id;
  console.log(req.params.id);
  let newValuteName = req.body.name
  try {
    var db = await connect();
    var newValute = await db.query("UPDATE valute SET name = ? WHERE id = ?", [newValuteName, id])
    .catch((err) => {
        console.log('*** error insert ***')
        console.log(err)
        res.send(400, err.message)
    })
    res.status(201).json({
          message: 'valute updating',
          valute: {
            name: newValuteName
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
    var deleteValute = await db.query('DELETE FROM valute WHERE id = ?', [id]);
    db.end();
    res.status(201).json({
          message: 'valute deleting',
          valute: {
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
    // if(!id) throw new Error('Please select valute if...')
    var db = await connect();
    let valute = await db.query('SELECT `id`,`name` \
         FROM `valute` \
         WHERE id >0')
    db.end();
    var fields = valute[0];
    // console.log('*** subCategories ***')
    // console.log(fields.length)
    if (!fields.length) {
      res.status(200).json({
        message: "valute empty",
        valute: fields
      })
    } 
    res.status(200).json({
      message: "valute list",
      valute: fields
    })
  } catch (error) {
    console.log(error.message)
    res.send(400, error.message)
  }
})

module.exports = router
