const mysql = require("mysql2/promise")
const dbconfig = require("../config/dbconfig")

async function connect(){
	let conn = await mysql.createConnection(dbconfig.dbDictionary);
	return conn;
}

exports.getCargoType = async  () => {
	let conn = await connect ()
	let [fields] = await conn.query(`SELECT id, name, description, attributes FROM cargo_type`)
	conn.end()
	let message;
	if (!fields.length) {
		message = "cargo Types empty"
	} else {
		message = "cargo Types list"
	}
	return {
		status: 200,
		message: message,
		cargoTypes: fields
	}
}
exports.editCargoType = async (id, data) => {
	let conn = await connect()
	var attr = JSON.stringify(data.attributes);
	let result = await conn.query(`UPDATE cargo_type 
		SET name = ?, description = ?, attributes = ? 
		WHERE id = ?`, [data.newCargoName, data.description,attr, id])
	return {
		status: 200,
		message: "updating  cargo type",
	}
}
exports.deleteCargoType = async (id) => {
	let conn = await connect()
	let result = await conn.query(`DELETE FROM cargo_type WHERE id = ?`, [id])
	return {
		status: 200,
		message: "Cargo Type delete"
	}
}

exports.addCargoType = async (data) => {
	let conn = await connect();
	var attr = JSON.stringify(data.attributes);
	let newCargo = await conn.query('INSERT INTO cargo_type (name, description, attributes) \
		VALUES (?, ?, ?)', [data.newCargoName, data.description, attr])
	conn.end()
	return {
		status: 200,
		message: "new cargo type add"
	}
}