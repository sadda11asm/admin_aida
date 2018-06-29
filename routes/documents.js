const router = require('express').Router()
const mysql = require('mysql2/promise')
// const async = require('async')
const dbconfig = require('../config/dbconfig')

async function connectDocuments(){
    let con = await mysql.createConnection(dbconfig.dbDocuments);
    return con;
}
async function connectUsers() {
	let con = await mysql.createConnection(dbconfig.dbUsers)
	return con;
}

router.get('/', async function (req, res, next) {
  // let id = req.params.id
  try {
    // if(!id) throw new Error('Please select cargo_type if...')
    var dbDocuments = await connectDocuments();
    var dbUsers = await connectUsers();
    let documentsInfo = await dbDocuments.query("SELECT documents->'$[0].path' as path, documents->'$[0].company_id' as company_id, documents->'$[0].factory_id' as factory_id, date, order_id from documents, orders WHERE documents.order_id = orders.id ORDER BY order_id DESC;")
    var fields = documentsInfo[0];
    for (var i=0;i<fields.length;i++) {
    	var order = await dbDocuments.query('SELECT COUNT(*) as ans FROM orders where id = ?', [fields[i]["order_id"]]);
    	if (order[0][0]["ans"]==0) {
    		fields.splice(i,1);
    		continue;
    	}
    	if (order)
	    if (fields[i]["company_id"]!=null) {
	    	var companyInfo = await dbUsers.query('SELECT name FROM companies WHERE id = ?', fields[i]["company_id"]);
	    	try {
	    		fields[i]["from"] = companyInfo[0][0]['name'];
	    	} catch (err) {
	    		fields.splice(i,1);
	    	}
	    	continue;
	    }
	    if (fields[i]["factory_id"]!=null) {
	    	var companyInfo = await dbUsers.query('SELECT name FROM companies WHERE id = ?', fields[i]["factory_id"]);
	    	try {
	    		fields[i]["to"] = companyInfo[0][0]['name'];
	    	} catch (err) {
	    		// console.log("FOUND", fields[i]);
	    		fields.splice(i,1);
	    	}
	    	continue;
	    }
	    // console.log(fields[i]);
	    var orderInfo = await dbDocuments.query('SELECT user_id FROM orders where id = ?', [fields[i]["order_id"]]);
	    // console.log(orderInfo[0][0]);
	    var userInfo = await dbUsers.query("SELECT id, firstname, lastname from users where id = ?", [orderInfo[0][0]['user_id']]);
	   	console.log(userInfo[0][0]);
	   	try{
	    	fields[i]["from"] = userInfo[0][0]["firstname"] + ' ' + userInfo[0][0]["lastname"];
		} catch (err) {
			fields.splice(i,1);
			// console.log('FOUND', fields[i]);
			continue;
		}
	    fields[i]["user_id"] = userInfo[0][0].id;
	}
    dbDocuments.end();
    dbUsers.end();
    // var fields = documents[0];
    // console.log('*** subCategories ***')
    // console.log(fields.length)
    if (!fields.length) {
      res.status(200).json({
        message: "documents empty",
        documents: fields
      })
    } 
    res.status(200).json({
      message: "documents list",
      documents: fields
    })
  } catch (error) {
    console.log(error.message)
    res.send(400, error.message)
  }
})


module.exports = router
