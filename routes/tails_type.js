  const router = require('express').Router()
const mysql = require('mysql2/promise')
// const async = require('async')
const dbconfig = require('../config/dbconfig')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

router.post('/', async function (req, res, next) {
  let newTailName = req.body.name
  let description = req.body.description
  let attr = req.body.attributes
  let attributes = JSON.stringify(attr);
  console.log(' ***  new tails_type ***')
  console.log(req.body)
  try {
    if(!newTailName) throw new Error('New tail type must have *Name*')
    if(!description) throw new Error('New tail type must have *Description*')
    // if(!attributes) throw new Error('New tail must have *Attributes*')  
    let db = await connect();
    let newTail = await db.query('INSERT INTO tails_type (name, description, attributes) \
                                    VALUES(?, ?, ?)', [newTailName, description, attributes])
    db.end();
    // let insertId = newTail[0].insertId;
    var fields = newTail;
    console.log('*** New Tails Type *** ')
    console.log(fields)
    res.status(201).json({
      message: 'new tails_type creating',
      tail: {
        tailName: newTailName,
        attributes: attr,
        description:description
      }
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
  let newTailName = req.body.name
  let description = req.body.description
  let attr = req.body.attributes
  let attributes =  JSON.stringify(attr);
  try {
    var db = await connect();
    var newTail = await db.query("UPDATE tails_type SET name = ?, description = ?, attributes = ? WHERE id = ?", [newTailName, description, attributes, id])
    .catch((err) => {
        console.log('*** error insert ***')
        console.log(err)
        res.send(400, err.message)
    })
    res.status(201).json({
          message: 'tail_type updating',
          tail_type: {
            name: newTailName, 
            description: description,
            attributes : attr
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
    var deleteTail = await db.query('DELETE FROM tails_type WHERE id = ?', [id]);
    db.end();
    res.status(201).json({
          message: 'tail_type deleting',
          tail_type: {
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
    // if(!id) throw new Error('Please select tail_type if...')
    var db = await connect();
    let tails_types = await db.query('SELECT `id`,`name`, description, tails_types \
         FROM `tails_type` \
         WHERE id >0')
    db.end();
    var fields = tails_types[0];
    // console.log('*** subCategories ***')
    // console.log(fields.length)
    if (!fields.length) {
      res.status(200).json({
        message: "tails_types empty",
        tails_types: fields
      })
    } 
    res.status(200).json({
      message: "tails_types list",
      tails_types: fields
    })
  } catch (error) {
    console.log(error.message)
    res.send(400, error.message)
  }
})



module.exports = router
