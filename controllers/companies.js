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
		FROM users.companies co
		JOIN dictionary.cities c on c.id = co._city_id
		WHERE co.is_actual = ?`, [isActual])
	.then(([fields]) => {
		conn.destroy()
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

exports.getCompanyInfo = async (idCompany) => {
	let conn = await mysql.createConnection(dbconfig.server)
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
		FROM users_demo.companies co
		JOIN dictionary.cities c ON c.id = co._city_id
		WHERE co.id = ? `, [idCompany] 
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

exports.editCompany = async (idCompany) => {
	let conn = mysql.createConnection()
	let result = conn.query(
	`
	UPDATE users_demo.companies co 
	SET co.name = ? , co.type = ? , co.rating = ? ,
		co._city_id  = ? , co.is_actual = ? ,
		co.email = ? , co.phone = ? , co.description = ? ,
		co.legal_address = ? , co.phycal_address = ? ,
		co.bin = ? , co.registration_number = ?
	WHERE co.id = ? `, [companyName, type, rating, email, isActual,
	phone, description, legalAddress, phycal_address, bin, 
	registrationNumber, idCompany]
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

exports.deleteCompany = async (idCompany) => {
	let conn = mysql.createConnection(dbconfig.server)
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