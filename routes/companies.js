const router = require('express').Router();
const mysql = require('mysql2/promise')
const ctrls = require('../controllers/companies')
router.post('/',  async (req, res, next) => {
	try {
		let result
		let method = req.body.method
		if (!method) throw new Error("Route don't have method")
		switch(method.toUpperCase()) {
			case 'GET':
				let isActual = req.body.isActual;
				if(isNaN(isActual) || !isActual || parseInt(isActual) > 2) throw new Error('status company is required')
				console.log('SELECT COMPANIES WITH PARAMETR IS_ACTUAL')
				result = await ctrls.getCompanies(isActual)
				res.status(result.status).json(result)		
				break;
			// case 'PUT':
			// 	console.log('update companies')
			// 	result = await ctrls.editCompanies()
			// 	res.status(result.status).json(result)
			// 	break;
			// case 'POST':
			// 	break;
			// case 'DELETE':
			//  	break;
			default:
				res.send(404, "NO FOUND METHOD PROVIVED");
				break;			
		}
	} catch(error) {
		console.log("*** error *** ")
		console.log(error)
		res.send(400, error.message)
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
			case 'PUT':
				console.log("update company information")
				result = await ctrls.editCompany(idCompany,data)
				res.status(result.status).json(result)
				break;
			case 'DELETE':
				console.log("company was delete")
				result = await ctrls.deleteCompany(idCompany)
				res.status(result.status).json(result)
			 	break;
			// case 'POST':
			// 	break;
			default:
				res.send(404, "NO FOUND METHOD PROVIVED");
				break;			
		}
	} catch(error) {
		console.log("*** error ***")
		console.log(error)
		res.send(400, error.message)
	}
})

module.exports = router;