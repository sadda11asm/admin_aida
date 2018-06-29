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
  let newCityName = req.body.name;
  let regionId = req.body.regionId
  let cityCode = req.body.code
  // let attributes = req.body.attributes
  console.log(' ***  new City ***')
  console.log(req.body)
  try {
    if(!(newCityName)) throw new Error('New City must have name')
    if(isNaN(regionId)) throw new Error('New City must have region id')
    if(!(cityCode)) throw new Error('New City must have code')
    var db = await connect();
    let newCity = await db.query('INSERT INTO cities (name, _region_id, code) \
                                  VALUES( ?, ?, ?)', [newCityName, regionId, cityCode])
    var fields = newCity;
    console.log('*** New City *** ')
    console.log(fields)
    res.status(201).json({
      message: 'new city creating',
      city: {
        city_name: newCategoryName,
        regionId: regionId,
        code: CityCode
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
