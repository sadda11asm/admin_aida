const mysql = require('mysql2/promise');
const dbconfig = require('../config/dbconfig')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

exports.getValutes = async () => {
	try {
		console.log("get valutes");
	    // if(!id) throw new Error('Please select valute if...')
	    var db = await connect();
	    let valute = await db.query(`SELECT id,name FROM valute WHERE id >0`)
	    db.end();
	    console.log()
	    var fields = valute[0];
	    // console.log('*** subCategories ***')
	    // console.log(fields.length)
	    if (!fields.length) {
	      return {
	      	status: 201,
	        message: "valute empty",
	        valutes: fields
	      }
	    } 
	    return {
	    	status: 200,
	      	message: "valute list",
	      	valutes: fields
	    }
	} catch (error) {
	    // console.log(error.message)
	    return {
	    	status: 402, 
	    	message: error.message
	    }
	}
}

exports.editValute = async (id, newValuteName) => { 
  try {
    var db = await connect();
    let searchValute = await db.query('SELECT `name` FROM `valute` WHERE `name` = ?', [newValuteName])
	if(searchValute[0].length) throw new Error('This valute already exists')
    var newValute = await db.query("UPDATE valute SET name = ? WHERE id = ?", [newValuteName, id])
    .catch((err) => {
        console.log('*** error insert ***')
        console.log(err)
        res.send(400, err.message)
    })
    return {
    	status: 201, 
	    message: 'valute updating',
	    valute: {
	    	name: newValuteName
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
exports.addValute = async (newValuteName) => {
	var result;
	try {
	    if(!newValuteName) throw new Error('New valute must have *name')
	    await mysql.createConnection(dbconfig.dbDictionary)
	    .then( async (conn) => {
	      let searchValute = await conn.query('SELECT `name` FROM `valute` WHERE `name` = ?', [newValuteName])
	      if(searchValute[0].length) throw new Error('This valute already exists')
	      let newValute = conn.query('INSERT INTO valute(name) VALUES (?) ', [newValuteName])
	      return newValute
	    })
	    .then(([fields]) => {
	      console.log('*** newValute ***')
	      console.log(fields)
	      result = {
	      	status: 201,
	        message: 'New valute creating',
	        valute: {
	        	valuteName: newValuteName
	        }
	      }
	    })
	    .catch((err) => {
	      console.log(err)
	      result =  {
	      	status: 400,
	      	message: err.message
	      }
	    })
	    return result;
  	} catch(error) {
    	console.log(error.message)
 	   return {
 	   	status: 400, 
 	   	message: error.message
 	   }
  	}
}

exports.dropValute = async (id) => {
  try {
    var db = await connect();
    var deleteValute = await db.query('DELETE FROM valute WHERE id = ?', [id]);
    db.end();
    return {
    	status: 201,
        message: 'valute deleting',
        valute: {
            id: id
        }
    }
  } catch (err) {
    console.log(err);
    return {
    	status: 400, 
    	message: err.message
    };
  }
}