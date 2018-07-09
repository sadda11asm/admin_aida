const mysql = require("mysql2/promise")
const dbconfig = require("../config/dbconfig")
async function connect() {
	let conn = await mysql.createConnection(dbconfig.dbDictionary)
	return conn
}

exports.getCities = async (regionId) => {
	var db = await connect();
	var result ={}
	try {
		var info = await db.query('SELECT id, name,_region_id, code FROM cities WHERE _region_id = ?', [regionId])
		result = {
			status: 200,
			message: 'getting cities',
			cities: info[0]
		}
	} catch (error) {
	    console.log(error.message)
	    result = {
	    	status: 400, 
	    	message: error.message
	    }
	} finally {
		db.end();
		return result;
	}
 } 

exports.addCity = async (newCityName, code, regionId) => {
	console.log(' ***  new city ***')
 	// console.log(req.body)
 	var db = await connect();
 	let result = {}
  	try {
	    if(!(newCityName)) throw new Error('New city must have name')
	    if(isNaN(regionId)) throw new Error('New city must have region id')
	    if(!(code)) throw new Error('New city must have code')
	    var db = await connect();
	    let newCity = await db.query('INSERT INTO cities (name, _region_id, code) \
	    VALUES( ?, ?, ?)', [newCityName, regionId, code])
	    var fields = newCity;
	    console.log('*** New city *** ')
	    console.log(fields)
	    result = {
	    	status: 201,
	      	message: 'new city creating',
	      	city: newCity[0]
	    }
	} catch (error) {
	    console.log('*** error ***')
	    console.log(error)
	    result = {
	    	status: 400, 
	    	message: error.message
	    }
	} finally {
  		db.end();
  		return result;
  	}		
}

exports.editCity = async (id, newCityName, code) => {
  let db = await connect();
  let result = {}
  try {
    
  } catch(error){
    console.log(error)
    result = {
    	status: 400, 
    	message: error.message
    }
  } finally {
  	db.end();
  	return result;
  }
}
exports.deleteRegion = async (categoryId) => {
	let db = await connect()
	let result = {}
	try {
	   
	} catch (err) {
	    console.log(err);
	    result = {
	    	status: 400, 
	    	message: err.message
	    }
	} finally {
		db.end();
		return result;
	}
}
