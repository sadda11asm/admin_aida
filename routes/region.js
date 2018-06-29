const router = require('express').Router()
const mysql = require('mysql2/promise')
// const async = require('async')
const dbconfig = require('../config/dbconfig')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}
  // Create new category
router.post('/', async function (req, res, next) {
  let newRegionName = req.body.name;
  let countryId = req.body.countryId
  let regionCode = req.body.code
  // let attributes = req.body.attributes
  console.log(' ***  new region ***')
  console.log(req.body)
  try {
    if(!(newRegionName)) throw new Error('New region must have name')
    if(isNaN(countryId)) throw new Error('New region must have country id')
    if(!(regionCode)) throw new Error('New region must have code')
    var db = await connect();
    let newRegion = await db.query('INSERT INTO regions (name, _country_id, code) \
    VALUES( ?, ?, ?)', [newRegionName, countryId, regionCode])
    var fields = newRegion;
    console.log('*** New region *** ')
    console.log(fields)
    res.status(201).json({
      message: 'new region creating',
      region: {
        region_name: newCategoryName,
        countryId: countryId,
        code: regionCode
      }
    })
  } catch (error) {
    console.log('*** error ***')
    console.log(error)
    res.send(400, error.message)
  }
})

// Edit Categories
router.put('/', (req, res, next)=> {
  let newCategoryName = req.body.newCategoryName
  let parentCategoryId = req.body.parentCategoryId
  let isActual = req.body.Actual
  try {

  } catch(error){
    console.log(error)
    res.send(400, error.message)
  }
})



module.exports = router
