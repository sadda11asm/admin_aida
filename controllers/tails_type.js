const mysql = require('mysql2/promise');
const dbconfig = require('../config/dbconfig')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

exports.getTails = async () => {
	let db;
	try {
	    // if(!id) throw new Error('Please select tail_type if...')
	    db = await connect();
	    let tails_types = await db.query('SELECT `id`,`name`, description, attributes \
	         FROM `tails_type` \
	         WHERE id >0')
	    db.end();
	    var fields = tails_types[0];
	    // console.log('*** subCategories ***')
	    // console.log(fields.length)
	    if (!fields.length) {
		    return {
		      	status: 200,
		      	message: "tails_types empty",
		      	tails_types: fields
		    }
	    } 
	    return {
	    	status:200,
	      	message: "tails_types list",
	      	tails_types: fields
	    }
 	} catch (error) {
	    console.log(error.message)
	    return {status: 400, message: error.message}
  	}
}

exports.editTails = async (id, newTailName, description, attr) => {
	var result;
	let attributes =  JSON.stringify(attr);
	let db;
	try {
		let db = await connect();
		let searchName = await db.query('select name from tails_type where name = ?', [newTailName]);
		if (searchName[0].length) throw new Error('The same name is already exists');
		var newTail = await db.query("UPDATE tails_type SET name = ?, description = ?, attributes = ? WHERE id = ?", [newTailName, description, attributes, id])
		.catch((err) => {
		    console.log('*** error insert ***')
		    console.log(err)
		    result = {
		    	status: 400, 
		    	message: err.message
		    }
		})
		result = {
			status: 201,
		    message: 'tail_type updating',
		    tails: {
		        name: newTailName, 
		        description: description,
		        attributes : attr
		    }
		}
		db.end();
		return result;
	} catch(error){
		console.log(error)
		return {
			status: 400,
			message: error.message
		}
	}
}
exports.addTails = async (newTailName, description, attr) => {
	var result;
	let attributes = JSON.stringify(attr);
  	console.log(' ***  new tails_type ***')
  	// console.log(req.body)
	let db;
	try {
		if(!newTailName) throw new Error('New tail type must have *Name*')
		if(!description) throw new Error('New tail type must have *Description*')
		// if(!attributes) throw new Error('New tail must have *Attributes*')  
		db = await connect();
		let searchName = await db.query('select name from tails_type where name = ?', [newTailName]);
		if (searchName[0].length) throw new Error('The same name is already exists');
		let newTail = await db.query('INSERT INTO tails_type (name, description, attributes) \
		                                VALUES(?, ?, ?)', [newTailName, description, attributes])
		db.end();
		// let insertId = newTail[0].insertId;
		var fields = newTail;
		console.log('*** New Tails Type *** ')
		console.log(fields)
		return {
			status:201,
			message: 'new tails_type creating',
		 	tail: {
			    tailName: newTailName,
			    attributes: attr,
			    description: description
		  	}
		}
	} catch (error) {
		console.log('*** error ***')
		console.log(error)
		return {
			status: 400, 
			message: error.message
		}
	} finally {
		db.end();
	}
}

exports.dropTails = async (id) => {
  // var id = req.params.id;
  let db;
  try {
    db = await connect();
    var deleteTail = await db.query('DELETE FROM tails_type WHERE id = ?', [id]);
    db.end();
    return {
    	status:201,
        message: 'tail_type deleting',
        tail_type: {
            id: id
        }
    }
  } catch (err) {
    console.log(err);
    return {
    	status: 400, 
    	message: err.message
    };
  } finally {
  	db.end();
  }
}