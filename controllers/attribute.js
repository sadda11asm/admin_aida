const mysql = require("mysql2/promise")
const dbconfig = require("../config/dbconfig")

async function connect(){
    let conn = await mysql.createConnection(dbconfig.dbDictionary);
    return conn;
}

exports.getAttributes = async () => {
	let conn = await connect()
	let attributes = await conn.query(`SELECT id, name FROM attribute`)
	.then(([fields]) => {
		conn.end()
		let message = "attributes list";
		if(!fields.length) 
    	message = "attributes empty" 
		return {
			status: 200,
			message: message,
			attributes: fields
		}
	})
	.catch(err => {
		conn.end()
		console.log(err)
		return {
			status: 403,
			message: "Error: " + err.message
		}
	})
	return attributes
}
exports.addAttribute = async (newAttributeName) => {
	let conn = await connect()
  let searchAttribute = await conn.query(`SELECT name FROM attribute WHERE name = ?`, [newAttributeName])
  if(searchAttribute[0].length) throw new Error("This attribute already exits")
  let newAttribute = await conn.query(`INSERT INTO attribute(name) VALUES (?) `, [newAttributeName])
  conn.end()
  console.log(newAttribute)
  console.log("***  Attribute ***")
  return {
    message: "New attribute creating",
    attribute: {
      attributeName: newAttributeName
    }
  }
}

exports.editAttribute = async (idAttribute, data) => {
  let conn = await connect();
  let newAttribute = await conn.query(`UPDATE attribute SET name = ? WHERE id = ?`, [newAttributeName, id])
  conn.end();
  return {
    message: "attribute updating",
    attribute: {
      name: newAttributeName
    }
  }
}
exports.deleteAttribute = async (idAttribute) => {
	let conn = await connect()
	var deleteAttribute = await conn.query(`DELETE FROM attribute WHERE id = ?`, [id]);
  conn.end();
  return {
        message: "attribute deleting",
        attribute: {
          id: id
        }
    }
}