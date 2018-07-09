const mysql = require('mysql2/promise');
const dbconfig = require('../config/dbconfig')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

exports.getUnit = async () => {
	try {
    // if(!id) throw new Error('Please select unit if...')
	    var db = await connect();
	    let unit = await db.query('SELECT `id`,`name`, `type` \
	         FROM `unit` \
	         WHERE id>0',)
	    db.end();
	    var fields = unit[0];
	    // console.log('*** subCategories ***')
	    // console.log(fields.length)
	    if (!fields.length) {
	      	return {
	      		status:200,
	        	message: "unit empty",
	        	unit: fields
	      	}
	    } 
	    return {
	    	status:200,
	      	message: "unit list",
	      	unit: fields
	    }
 	} catch (error) {
	    console.log(error.message)
	    return {
	    	status: 400, 
	    	message: error.message
	    }
  	}	
}

exports.editUnit = async (id, newUnitName, typeUnit) => { 
	// console.log(req.params.id);
	// let newUnitName = req.body.name
	try {
	    var db = await connect();
	    var newUnit = await db.query("UPDATE unit SET name = ?, type = ? WHERE id = ?", [newUnitName, typeUnit, id])
	    .catch((err) => {
	        console.log('*** error insert ***')
	        console.log(err)
	        res.send(400, err.message)
	    })
	    return {
	    	status: 201,
	        message: 'unit updating',
	        unit: {
	            name: newUnitName, 
	            type: typeUnit
	        }
	    }
	    db.end();
	} catch(error){
	    console.log(error)
	    return {
	    	status: 400, 
	    	message: error.message
	    }
	}
}
exports.addUnit = async (newUnitName, typeUnit) => {
	let result;
	try {
	    if(!newUnitName) throw new Error('New Unit must have *name')
	    if(!typeUnit) throw new Error('type is wrong')
	    await mysql.createConnection(dbconfig.dbDictionary)
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
				result = {
					status: 201,
					message: 'New unit creating',
					unit: {
						unitName: newUnitName,
						type: typeUnit
					}
				}
		    })
	    .catch( (err) => {
	    	console.log("*** New unit didn't create ***")
	    	console.log(err)
	    	result = {
	      		status: 400,
	      		message:  err.message
	    	}
	    })
	    return result;
  	} catch(error) {
	    console.log('***  New unit ***')
	    return {
	    	status: 400,
	    	message: error.message
	    }
  	}
}

exports.dropUnit = async (id) => {
	try {
	    var db = await connect();
	    var deleteUnit = await db.query('DELETE FROM unit WHERE id = ?', [id]);
	    db.end();
	    return {
	    	status: 201,
	        message: 'unit deleting',
	        unit: {
	            id: id
	        }
	    }
 	} catch (err) {
    	console.log(err);
    	res.send(400, err.message);
    }  
}