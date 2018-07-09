const mysql = require("mysql2/promise")
const dbconfig = require("../config/dbconfig")
async function connect() {
	let conn = await mysql.createConnection(dbconfig.dbDictionary)
	return conn
}

exports.getCountry = async () => {
	var db = await connect();
	var result ={}
	try {
		var info = await db.query('SELECT id, name, code FROM countries')
		result = {
			status: 200,
			message: 'getting countries',
			countries: info[0]
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

exports.addCountry = async (newCountryName, code) => {
	console.log(' ***  new country ***')
 	// console.log(req.body)
 	var db = await connect();
 	let result = {}
  	try {
	    if(!(newCountryName)) throw new Error('New country must have name')
	    if(!(countryCode)) throw new Error('New country must have code')
	    var db = await connect();
	    let newCountry = await db.query('INSERT INTO countries (name, code) \
	    VALUES( ?, ?)', [newCountryName, countryCode])
	    var fields = newCountry;
	    console.log('*** New country *** ')
	    console.log(fields)
	    result = {
	    	status: 201,
	      	message: 'new country creating',
	      	country: {
	        	country_name: newCategoryName,
	        	code: countryCode
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

exports.editCountry = async (id, newCountryName, code) => {
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
