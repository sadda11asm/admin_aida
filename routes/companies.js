const router = require('express').Router();
const mysql = require('mysql2/promise')
const ctrls = require('../controllers/companies')
router.post('/',  async (req, res, next) => {
	try {
		let result, isActual;
		isActual = req.body.isActual
		if(isNaN(isActual) || !isActual || parseInt(isActual) > 3) throw new Error('status company is required')
		let method = req.body.method
		switch(method.toUpperCase()) {
			case 'GET':		
				console.log('SELECT COMPANIES WITH PARAMETR IS_ACTUAL')
				result = await ctrls.getCompanies(isActual)
				res.status(result.status).json(result)		
				break;
			case 'PATCH':
				let idCompany = req.body.idCompany
				if(!idCompany) throw new Error("don't have idCompany")
				result = await ctrls.editCompanies(idCompany, isActual)
				res.status(result.status).json(result)
				break;
			// case 'POST':
			// 	break;
			// case 'DELETE':
			//  	break;
			default:
				res.status.json({
					status: 404,
					message: "NO FOUND METHOD PROVIVED"
				});
				break;			
		}
	} catch(err) {
		console.log("*** error *** ")
		console.log(err)
		res.send(400, "Error: " + err.message)
	}
})
router.post('/:idCompany',  async (req, res, next) => {
	try {	
		let result;
		let method = req.body.method
		if(!method) throw new Error("Route don't have method")
		let idCompany = req.params.idCompany;
		console.log("company id")
		console.log(idCompany)
		if(!idCompany) throw new Error("company didn't select ")
		switch(method.toUpperCase()) {
			case 'GET':
				console.log("companies information")
				result = await ctrls.getCompanyInfo(idCompany)
				res.status(result.status).json(result)		
				break;
			case 'PATCH':
				console.log("update company information")
				result = await ctrls.editCompany(idCompany, data)
				res.status(result.status).json(result)
				break;
			case 'DELETE':
				console.log("company was delete")
				result = await ctrls.dropCompany(idCompany)
				res.status(result.status).json(result)
			 	break;
			// case 'POST':
			// 	break;
			default:
				res.send(404, "NO FOUND METHOD PROVIVED");
				break;			
		}
	} catch(err) {
		console.log("*** error ***")
		console.log(err)
		res.send(400, "Error" + err.message)
	}
})

router.post('/:idCompany/users', async (req, res) => {
	try {
		let result;
		let method = req.body.method
		if(!method) throw new Error("Route don't have method")
		let idCompany = req.params.idCompany
		if(!method) throw new Error("You didn't select company")
		switch(method.toUpperCase()) {
			case "GET":
				console.log("select all users of a company")
				result = await ctrls.getAllUsersOfCompany(idCompany)
				// console.log("RESULT", result);
				res.status(result.status).json(result)
				break;
			// case "PUT":
			// 	console.log()
			// 	break;
			// case "DELETE":
			// 	break;
			// case "POST":
			// 	break;
			default:
				res.send(404, "NO FOUND METHOD PROVIVED")
				break;
		}
	}catch(err) {
		console.log(" **** error *** ")
		console.log(err)
		res.send(400, "Error" + err.message)
	}
})

router.post('/:idCompany/users/:idUser', async (req, res) => {
	try {
		let result;
		let method = req.body.method
		let idCompany = req.params.idCompany
		if(!idCompany) throw new Error("you don't select company ")
		let idUser = req.params.idUser
		switch(method.toUpperCase()) {
			case 'GET':
				console.log("select a user of company")
				result = await ctrls.getUserOfCompany(idCompany, idUser, data)
				res.status(restult.status).json(result)
				break;
			case 'PATCH':
				console.log("update a user of company")
				// этот route не работает 
				result = await ctrls.editUserOfCompany(idCompany, idUser, data)
				res.status(result.status).json(result)
				break;
			case 'DELETE':
				console.log("user was delete")
				result = await ctrls.dropUserOfCompany(idCompany, idUser)
				res.status()
				break;
			default:
				res.send(404, "NO FOUND METHOD PROVIVED")
				break;
		}
	} catch(err) {
		console.log(" *** error *** ")
		console.log(err)
		res.send(400, "Error" + err.message)
	}
})
module.exports = router;