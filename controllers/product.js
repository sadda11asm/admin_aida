const mysql = require('mysql2/promise');
const dbconfig = require('../config/dbconfig')

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbDictionary);
    return con;
}

exports.getProduct = async () => {
	let db;
	try {
	    // if(!id) throw new Error('Please select Product if...')
	    db = await connect();
	    let products = await db.query('SELECT `id`,`name` \
	         FROM `product` \
	         WHERE id >0')
	    db.end();
	    var fields = products[0];
	    // console.log('*** subCategories ***')
	    // console.log(fields.length)
	    if (!fields.length) {
	      return { 
	      	status: 200,
	        message: "Products empty",
	        products: fields
	      }
	    } 
	    return {
	    	status: 200,
	      	message: "Products list",
	      	products: fields
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

exports.editProduct = async (id, newProductName) => {
	var result;
	// let newProductName = req.body.name
	let db;
	try {
	    db = await connect();
	    var newProduct = await db.query("UPDATE product SET name = ? WHERE id = ?", [newProductName, id])
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
	        message: 'Product updating',
	        product: {
	            name: newProductName
	        }
	    }
	} catch(error){
	    console.log(error)
	    result = {
	    	status: 400, 
	    	message: error.message
	    }
	} finally {
		db.end();
		return result;
	}
}
exports.addProduct = async (newProductName) => {
	var result;
	let db;
	try {
	    if(!newProductName) throw new Error('New Product must have *name')
	    db = await connect();
		var searchName = await db.query('SELECT name FROM product where name = ?', [newProductName]);
		if (searchName[0].length) throw new Error("This name is already exists!");
	    await mysql.createConnection(dbconfig.dbDictionary)
	    .then( async (conn) => {
	      let searchProduct = await conn.query('SELECT `id`, `name` FROM `product` \
	      WHERE `name` = ? ', [newProductName])
	      if(searchProduct[0].length) throw new Error('This product already exist')
	      let newProduct = await conn.query('INSERT INTO `product`(`name`) VALUES(?)', [newProductName])
	      conn.destroy()
	      return newProduct
	    })
	    .then((newProduct) => {
	      console.log('*** new product ***')
	      console.log(newProduct)
	      result = {
	      	status: 201,
	        message: 'New product creating',
	        product: {
	          productName: newProductName
	        }
	      }
	    })
	    .catch((err) => {
	      console.log("*** New product didn't create ***")
	      console.log(err)
	      result = {
	      	status: 400, 
	      	message: err.message
	      }
	    })
	} catch(error) {
	    console.log('***  New Product ***')
	    result = {
	    	status: 400, 
	    	message: error.message
	    }
	} finally {
		db.end();
		return result;
	}
}

exports.dropProduct = async (id) => {
  // var id = req.params.id;
  let db;
  // var id = req.params.id;
  try {
    db = await connect();
    var deleteProduct = await db.query('DELETE FROM product WHERE id = ?', [id]);
    db.end();
    return {
    	status: 201,
        message: 'Product deleting',
        product: {
            id: id
        }
    }
  } catch (err) {
    console.log(err);
    return {
    	status: 400, 
    	message: err.message
    }
  } finally {
  	db.end();
  }
}