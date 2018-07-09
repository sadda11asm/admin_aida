const mysql = require("mysql2/promise")
const dbconfig = require("../config/dbconfig")
async function connect() {
	let conn = await mysql.createConnection(dbconfig.dbDictionary)
	return conn
}

exports.getRegions = async (countryId) => {
	var db = await connect();
	var result ={}
	try {
		var info = await db.query('SELECT id, name,_country_id, code FROM regions WHERE _country_id = ?', [countryId])
		result = {
			status: 200,
			message: 'getting regions',
			regions: info[0]
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

exports.addRegion = async (newRegionName, code, countryId) => {
	console.log(' ***  new country ***')
 	// console.log(req.body)
 	var db = await connect();
 	let result = {}
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
	    result = {
	    	status: 201,
	      	message: 'new region creating',
	      	region: {
	        	region_name: newCategoryName,
	        	countryId: countryId,
	        	code: regionCode
	      	}
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

exports.editRegion = async (id, newRegionName, code) => {
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
