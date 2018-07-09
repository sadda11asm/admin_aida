const mysql = require("mysql2/promise")
const dbconfig = require("../config/dbconfig")
async function connect() {
	let conn = await mysql.createConnection(dbconfig.dbDictionary)
	return conn
}

exports.getCategories = async (parentCategoryId) => {
	let db = await connect()
	var result ={}
	try {
		var info = await db.query('SELECT id, name, upcat as parentCategoryId, is_actual as isActual FROM catedgories WHERE upcat = ?', [parentCategoryId])
		result = {
			status: 200,
			message: 'getting categories',
			regions: info[0]
		}
	} catch (error) {
	    console.log(error.message)
	    result = {
	    	status: 400, 
	    	message: error.message
	    }
	} finally {
		db.end();
		return result;
	}
}

exports.addCategory = async(parentCategoryId, name, isActual) => {
	var db = await connect();
	let result = {};
	try {
	    let categories = await db.query('INSERT INTO categories (name, upcat, is_actual ) \
	         VALUES \
	         (?,?,?)', [name, parentCategoryId, isActual]);
	    var fields = categories;
	    // console.log('*** subCategories ***')
	    // console.log(fields.length)
	    // if (!fields.length) {
	    //   result = {
	    //   	status: 200,
	    //     message: "subCategories empty",
	    //     subCategories: fields
	    //   }
	    } 
	    result = {
	    	status:201,
	     	message: "creating category",
	     	categories[0]
	    }
  	} catch (error) {
	    console.log(error.message)
	    result = {
	    	status: 400, 
	    	message: error.message
	    }
  	} finally {
  		db.end();
  		return result;
  	}
}

exports.editCategory = async (id, newCountryName, code) => {
  let db = await connect();
  let result = {}
  try {
    var newCategory = await db.query("UPDATE categories SET name = ?, upcat = ?, is_actual = ? WHERE id = ?", [newCategoryName, parentCategoryId, isActual, id])
    .catch((err) => {
        console.log('*** error insert ***')
        console.log(err)
        result  = {
        	status: 400, 
        	message: err.message
        }
    })
    result = {
    	status: 201,
        message: 'category updating',
        category: {
            categoryName: newCategoryName,
            parentCategoryId: parentCategoryId,
            status:isActual
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
exports.deleteCategory = async (categoryId) => {
	let db = await connect()
	let result = {}
	try {
	    var deleteCategory = await db.query('DELETE FROM categories WHERE id = ?', [id]);
	    result =  {
	    	status: 201,
	        message: 'category deleting',
	        category: {
	            id: id
	        }
	    }
	} catch (err) {
	    console.log(err);
	    result = {
	    	status: 400, 
	    	message: err.message
	    }
	} finally {
		db.end();
		return result;
	}
}

