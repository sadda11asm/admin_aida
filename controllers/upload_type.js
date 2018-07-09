const mysql = require('mysql2/promise');
const dbconfig = require('../config/dbconfig')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

exports.getUpload = async () => {
	let db;
	try {
	    // if(!id) throw new Error('Please select upload_type if...')
	    db = await connect();
	    let attributes = await db.query('SELECT `id`,`name`, description, attributes \
	         FROM `upload_type` \
	         WHERE id >0')
	    var fields = attributes[0];
	    // console.log('*** subCategories ***')
	    // console.log(fields.length)
	    if (!fields.length) {
	      return {
	      	status:200,
	        message: "attributes empty",
	        attributes: fields
	      }
	    } 
	    return {
	    	status:200,
	    	message: "attributes list",
	    	attributes: fields
	    }
	} catch (error) {
		console.log(error.message)
		return {
			status: 400, 
			message: error.message
		}
	} finally {
		db.end();
	}
}

exports.editUpload = async (id, newUploadName, description, attr) => { 
  let attributes =  JSON.stringify(attr);
  let db;
  try {
    db = await connect();
    let searchName = await db.query('select name from upload_type where name = ?', [newUploadName]);
	if (searchName[0].length) throw new Error('The same name is already exists');
    var newUpload = await db.query("UPDATE upload_type SET name = ?, description = ?, attributes = ? WHERE id = ?", [newUploadName, description, attributes, id])
    .catch((err) => {
        console.log('*** error insert ***')
        console.log(err)
        res.send(400, err.message)
    })
    return {
    	status: 201,
        message: 'upload_type updating',
        upload_type: {
            name: newUploadName, 
            description: description,
            attributes : attr
        }
    }
    db.end();
  } catch(error){
    console.log(error)
    return {
    	status: 400, 
    	message: error.message
    }
  } finally {
  	db.end();
  }
}
exports.addUpload = async (newuploadName, description, attr) => {
	var result;
	let attributes = JSON.stringify(attr);
	console.log(' ***  new upload type ***')
	// console.log(req.body)
	let db;
	try {
		if(!newuploadName) throw new Error('New upload type must have *Name*')
		if(!description) throw new Error('New upload type must have *Description*')
		if(!attributes) throw new Error('New tail must have *Attributes*')  
		db = await connect();
		let searchName = await db.query('select name from upload_type where name = ?', [newuploadName]);
		if (searchName[0].length) throw new Error('The same name is already exists');
		var newupload = await db.query('INSERT INTO upload_type (name, description, attributes) \
		                                VALUES(?, ?, ?)', [newuploadName, description, attributes])
		db.end();
		// let insertId = newupload[0].insertId;
		// let newuploadtail = await conn.query('INSERT INTO upload_tail (upload_id, tail_id) VALUES (?,?)', [insertId, tailId]);
		var fields = newupload;
		console.log('*** New Upload type *** ')
		console.log(fields)
		return {
			status: 201,
			message: 'new upload type creating',
			upload: {
				uploadName: newuploadName,
				attributes: attr,
				// tailId: tailId,
				description:description
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

exports.dropUpload = async (id) => {
  try {
    var db = await connect();
    var deleteUpload = await db.query('DELETE FROM upload_type WHERE id = ?', [id]);
    db.end();
    return {
    	status: 201,
        message: 'upload_type deleting',
        upload_type: {
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