const mysql = require('mysql2/promise');
const dbconfig = require('../config/dbconfig')

// get all companies with is_actual parametr
exports.getCompanies = async (isActual) => {
	const conn = await mysql.createConnection(dbconfig.server)
	let companies = await conn.query(`
		SELECT co.id 'idCompany', co.name 'companyName', co.rating, co._city_id 'idCity',
		c.name 'city', co.is_actual 'isActual', co.type, 
		CASE 
			when co.type = 1 then 'Завод'
			when co.type = 2 then 'Логист'
			when co.type = 3 then 'Склад'
			when co.type = 4 then 'Юр. лица'
		END 'companyType'
		FROM users_demo.companies co
		JOIN dictionary.cities c on c.id = co._city_id
		WHERE co.is_actual = ?`, [isActual])
	.then(([fields]) => {
		conn.destroy()
		console.log()
		return {
			status: 200,
			message: 'THE COMPANIES',
			companies: fields
		}
	})
	.catch(err => {
		conn.destroy()
		console.log(err)
		return {
			status: 403,
			message: 'Error' + err.message
		}
	})
	return companies
}

exports.editCompanies = async (idCompany, isActual) => { 
	let conn = await mysql.createConnection(dbconfig.server)
	let updateCompany = await conn.query(`
		UPDATE users_demo.companies co SET co.is_actual = ? 
		WHERE co.id = ? `, [ isActual, idCompany])
		.then((result) => {
			conn.destroy()
			return {
				status: 200,
				message: " update company  status",
				companyInfo: result
			}
		})
		.catch(err => {
			conn.destroy()
			console.log(err)
			return {
				status: 403,
				message: "Error: " + err.message
			}
		})
		return updateCompany
}
exports.getCompanyInfo = async (idCompany) => {
	let conn = await mysql.createConnection(dbconfig.server)
	let users = "users_demo.companies"
	let company = await conn.query(
		`
		SELECT co.id 'idCompany', co.name 'companyName', co.rating, co._city_id 'idCity',
		c.name 'city', co.is_actual 'isActual', 
		co.description , co.type , co.email , co.phone , co.legal_address 'legalAddress'
		,  co.physical_address 'physicalAddress', co.bin 'bin', co.registration_number 'registrationNumber'
		, CASE 
			when co.type = 1 then 'Завод'
			when co.type = 2 then 'Логист'
			when co.type = 3 then 'Склад'
			when co.type = 4 then 'Юр. лица'
		END 'companyType'
		FROM ?? co
		JOIN dictionary.cities c ON c.id = co._city_id
		WHERE co.id = ? `, [users, idCompany] 
	)
	.then(([fields]) => {
		conn.destroy()
		return {
			status: 200,
			message: "one company  information",
			companyInfo: fields
		}
	})
	.catch(err => {
		conn.destroy()
		console.log(err)
		return {
			status: 403,
			message: "Error: " + err.message
		}
	})
	return company
}

exports.editCompany = async (idCompany, data) => {
	let conn = await mysql.createConnection()
	let result = conn.query(`
	UPDATE users_demo.companies co 
	SET co.name = ? , co.type = ? , co.rating = ? ,
		co._city_id  = ? , co.is_actual = ? ,
		co.email = ? , co.phone = ? , co.description = ? ,
		co.legal_address = ? , co.phycal_address = ? ,
		co.bin = ? , co.registration_number = ?
	WHERE co.id = ? `, [data.companyName, data.type, data.rating, data.email, data.isActual,
	data.phone, data.description, data.legalAddress, data.phycal_address, data.bin, 
	data.registrationNumber, data.idCompany]
	)
	.then(([fields]) => {
		conn.destroy()
		return {
			status: 200,
			message: "Company information Update"
		}
	})
	.catch(err => {
		console.log(err)
		return {
			status: 403,
			message: "Error: " + err.message
		}
	})
}
exports.dropCompany = async (idCompany) => {
	let conn = await mysql.createConnection(dbconfig.server)
	conn.query(
		`DELETE FROM users_demo.companies c WHERE c.id = ?` , [idCompany]
	)
	.then((result) => {
		conn.destroy()
		console.log(result)
		return {
			status:200,
			message: "Company was delete"
		}
	})
	.catch(err => {
		conn.destroy()
		console.log(err)
		return {
			status: 403,
			message: "Error: " + err.message
		}
	})
}
exports.getAllUsersOfCompany = async (idCompany) => {
	let conn = await mysql.createConnection(dbconfig.server)
	let result;
	await conn.query(`
		SELECT co.id 'idCompany'
		, co.name 'companyName'
		, CASE 
			when co.type = 1 then 'Завод'
			when co.type = 2 then 'Логист'
			when co.type = 3 then 'Склад'
			when co.type = 4 then 'Юр. лица'
			END 'companyType'
		, u.id , u.firstname , u.lastname , u.email 
		, u.credit_user_name , u.credit_craft_number, u.credit_cvv_cvc
		, u.credit_expiry_date , u.balance, u.iin , u._language_id 
		, u.user_type , u.identificate_info , u.is_active 
		, JSON_EXTRACT(p.access_level, "$.role") 'role'
		, JSON_EXTRACT(p.access_level, "$.queue") 'queue'
		FROM users_demo.companies co
		JOIN dictionary.cities c ON c.id = co._city_id
		JOIN users_demo.permissions p ON p._company_id = co.id
		JOIN users_demo.users u ON u.id = p._user_id
		WHERE co.id = ? `, [idCompany])
	.then(([fields]) => {
		// console.log("fields", fields);
		conn.destroy()
		result = {
			status: 200,
			message: "All Users",
			users: fields
		}
		return;
	})
	.catch( err => { 
		console.log(err)
		conn.destroy()
		result =  {
			status: 403,
			message: "Error: " + err.message
		}
	})
	// console.log("result ", result); 
	return result;
}
exports.getUserOfCompany = async (idCompany, idUser) => {
	let conn = await mysql.createConnection(dbconfig.server)
	conn.query(`
		SELECT co.id 'idCompany'
		, co.name 'companyName'
		, CASE 
			when co.type = 1 then 'Завод'
			when co.type = 2 then 'Логист'
			when co.type = 3 then 'Склад'
			when co.type = 4 then 'Юр. лица'
			END 'companyType'
		, u.id , u.firstname , u.lastname , u.email 
		, u.credit_user_name , u.credit_craft_number, u.credit_cvv_cvc
		, u.credit_expiry_date , u.balance, u.iin , u._language_id 
		, u.user_type , u.identificate_info , u.is_active 
		, JSON_EXTRACT(p.access_level, "$.role") 'role'
		, JSON_EXTRACT(p.access_level, "$.queue") 'queue'
		FROM users_demo.companies co
		JOIN dictionary.cities c ON c.id = co._city_id
		JOIN users_demo.permissions p ON p._company_id = co.id
		JOIN users_demo.users u ON u.id = p._user_id
		WHERE co.id = 270 AND u.id = 633`, [idCompany, idUser])
	.then(([fields]) => {
		conn.destroy()
		return {
			status: 200,
			message: "user information companies",
			user: fields,
		}
	})
	.catch(err => {
		console.log(err)
		return {
			status: 403,
			message: "Error: " + err.message
		}
	})
}
// здесь  не дописаный код
exports.editUserOfCompany =  async (idCompany, idUser, data) => {
	let conn = await mysql.createConnection()
// 	conn.query(
// 		`UPDATE users_demo.companies co
// JOIN users_demo.permissions p ON p._company_id = co.id
// JOIN users_demo.users u ON u.id = p._user_id
// SET u.firstname , u.lastname , u.email , u.credit_user_name , u.credit_craft_number 
// 	, u.credit_cvv_cvc , u.user_type , u.identificate_info , u.is_active , 
// 	, u.credit_expiry_date , u.landline_phone , u.mobile_phone , u.iin, u._language_id 
// 	, u.user_type, u.identificate_info, u.
// WHERE co.id = ? and u.id = ? 
// 		`, [data. .... , idCompany, idUser]
// 		)
}