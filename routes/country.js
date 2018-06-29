const router = require('express').Router()
const mysql = require('mysql2/promise')
// const async = require('async')
const dbconfig = require('../config/dbconfig')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

router.post('/', async function (req, res, next) {
  let newCountryName = req.body.name;
  let code = req.body.code
  console.log(' ***  new country ***')
  console.log(req.body)
  try {
    if(!(newCountryName)) throw new Error('New country must have name')
    if(!(code)) throw new Error('New country must have code')
    var db = await connect();
    let newCountry = await db.query('INSERT INTO countries (name, code) \
                                   VALUES( ?, ?)', [newCountryName, code])
    db.end();
    var fields = newCountry;
    console.log('*** New Coutnry *** ')
    console.log(fields)
    res.status(201).json({
      message: 'new country creating',
      country: {
        country_name: newCountryName,
        code: code
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
  let newCountryName = req.body.name
  let code = req.body.code
  // let attr = req.body.attributes
  // let attributes =  JSON.stringify(attr);
  try {
    var db = await connect();
    var newCountry = await db.query("UPDATE countries SET name = ?, code = ? WHERE id = ?", [newCountryName, code, id])
    .catch((err) => {
        console.log('*** error insert ***')
        console.log(err)
        res.send(400, err.message)
    })
    res.status(201).json({
          message: 'country updating',
          country: {
            name: newCountryName, 
            code: code
            // attributes : attr
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
    var deleteCountry = await db.query('DELETE FROM countries WHERE id = ?', [id]);
    db.end();
    res.status(201).json({
          message: 'country deleting',
          country: {
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
    // if(!id) throw new Error('Please select cargo_type if...')
    var db = await connect();
    let countries = await db.query('SELECT `id`,`name`, code \
         FROM `countries` \
         WHERE id >0')
    db.end();
    var fields = countries[0];
    // console.log('*** subCategories ***')
    // console.log(fields.length)
    if (!fields.length) {
      res.status(200).json({
        message: "countries empty",
        countries: fields
      })
    } 
    res.status(200).json({
      message: "countries list",
      countries: fields
    })
  } catch (error) {
    console.log(error.message)
    res.send(400, error.message)
  }
})



module.exports = router
