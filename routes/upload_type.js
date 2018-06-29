const router = require('express').Router()
const mysql = require('mysql2/promise')
// const async = require('async')
const dbconfig = require('../config/dbconfig')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

router.post('/', async function (req, res, next) {
  let newuploadName = req.body.name
  let description = req.body.description
  let attr = req.body.attributes
  let attributes = JSON.stringify(attr);
  console.log(' ***  new upload type ***')
  console.log(req.body)
  try {
    if(!newuploadName) throw new Error('New upload type must have *Name*')
    if(!description) throw new Error('New upload type must have *Description*')
    if(!attributes) throw new Error('New tail must have *Attributes*')  
    var db = await connect();
    var newupload = await db.query('INSERT INTO upload_type (name, description, attributes) \
                                    VALUES(?, ?, ?)', [newuploadName, description, attributes])
    db.end();
    // let insertId = newupload[0].insertId;
    // let newuploadtail = await conn.query('INSERT INTO upload_tail (upload_id, tail_id) VALUES (?,?)', [insertId, tailId]);
    var fields = newupload;
    console.log('*** New Upload type *** ')
    console.log(fields)
    res.status(201).json({
      message: 'new upload type creating',
      upload: {
        uploadName: newuploadName,
        attributes: attr,
        // tailId: tailId,
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
  let newUploadName = req.body.name
  let description = req.body.description
  let attr = req.body.attributes
  let attributes =  JSON.stringify(attr);
  try {
    var db = await connect();
    var newUpload = await db.query("UPDATE upload_type SET name = ?, description = ?, attributes = ? WHERE id = ?", [newUploadName, description, attributes, id])
    .catch((err) => {
        console.log('*** error insert ***')
        console.log(err)
        res.send(400, err.message)
    })
    res.status(201).json({
          message: 'upload_type updating',
          upload_type: {
            name: newUploadName, 
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
    var deleteUpload = await db.query('DELETE FROM upload_type WHERE id = ?', [id]);
    db.end();
    res.status(201).json({
          message: 'upload_type deleting',
          upload_type: {
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
    // if(!id) throw new Error('Please select upload_type if...')
    var db = await connect();
    let attributes = await db.query('SELECT `id`,`name`, description, attributes \
         FROM `upload_type` \
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
