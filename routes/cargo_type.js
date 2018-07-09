const router = require('express').Router()
let ctrls = require("../controllers/cargo_type")

async function connect(){
  let conn = await mysql.createConnection(dbconfig.dbDictionary);
  return conn;
}

// Create new category
router.post("/", async (req, res, next) => {
  try {
    let result;
    let method = req.body.method
    if(!method) throw new Error("REQUEST DON'T HAVE METHOD PROVIVED")
    switch(method.toUpperCase()) {
      case "GET":
        result = await ctrls.getCargoType()
        res.status(result.status).json(result)
        break;
      case "POST":
        var data = {}
        data.newCargoName = req.body.name;
        data.description = req.body.description;
        data.attributes = req.body.attributes;
        result = await ctrls.addCargoType(data)
        res.status(result.status).json(result)
        break;
      case "PATCH":
        var data = {}
        var idCargoType = req.body.id;
        data.newCargoName = req.body.name;
        data.description = req.body.description;
        data.attributes = req.body.attributes;
        result = await ctrls.editCargoType(idCargoType, data)
        res.status(result.status).json(result)
        break;
      case "DELETE":
        var idCargoType = req.body.id;
        result = await ctrls.deleteCargoType(idCargoType)
        res.status(result.status).json(result)
        break;
      default:
        res.status(404).json({
          message: "NO FOUND METHOD PROVIVED"
        })
    }
  } catch(error) {
    console.log(error)
    res.status(400).json({
      status: 400,
      message: "Error" + error.message
    })
  }
})

// router.post('/', async function (req, res, next) {
//   try {
//   let newCargoName = req.body.name;
//   let description = req.body.description
//   let attr = req.body.attributes
//   let attributes = JSON.stringify(attr)
//   console.log(' ***  new cargo type ***')
//   console.log(req.body)
//     if(!(newCargoName)) throw new Error('New cargo must have name')
//     if(!(description)) throw new Error('New cargo must have description')
//     if(!(attributes)) throw new Error('New cargo must have attributes')
//     var db = await connect();
//     let newCargo = await db.query('INSERT INTO cargo_type (name, description, attributes) \
//                                   VALUES (?, ?, ?)', [newCargoName, description, attributes])
//     db.end();
//     var fields = newCargo;
//     console.log('*** New Cargo_type *** ')
//     console.log(fields)
//     res.status(201).json({
//       message: 'new cargo type creating',
//       cargo_type: {
//         cargo_name: newCargoName,
//         description: description,
//         attributes: attributes
//       }
//     })
//       // })
//       // .catch((err) => {
//       //   console.log('*** error insert ***')
//       //   console.log(err)
//       //   res.send(400, err.message)
//       // })
//   } catch (error) {
//     console.log('*** error ***')
//     console.log(error)
//     res.send(400, error.message)
//   }
// })
// // Edit Categories

// router.patch('/:id', async function (req, res, next) {
//   var id = req.params.id;
//   console.log(req.params.id);
//   let newCargoName = req.body.name
//   let description = req.body.description
//   let attr = req.body.attributes
//   let attributes =  JSON.stringify(attr);
//   try {
//     var db = await connect();
//     var newCargo = await db.query("UPDATE cargo_type SET name = ?, description = ?, attributes = ? WHERE id = ?", [newCargoName, description, attributes, id])
//     .catch((err) => {
//         console.log('*** error insert ***')
//         console.log(err)
//         res.send(400, err.message)
//     })
//     res.status(201).json({
//           message: 'cargo_type updating',
//           cargo_type: {
//             name: newCargoName, 
//             description: description,
//             attributes : attr
//           }
//         })
//     db.end();
//   } catch(error){
//     console.log(error)
//     res.send(400, error.message)
//   }
// })

// router.delete('/:id', async function (req, res, next) {
//   var id = req.params.id;
//   try {
//     var db = await connect();
//     var deleteCargo = await db.query('DELETE FROM cargo_type WHERE id = ?', [id]);
//     db.end();
//     res.status(201).json({
//           message: 'cargo_type deleting',
//           cargo_type: {
//             id: id
//           }
//         })
//   } catch (err) {
//     console.log(err);
//     res.send(400, err.message);
//   }
// })

// router.get('/', async function (req, res, next) {
//   // let id = req.params.id
//   try {
//     // if(!id) throw new Error('Please select cargo_type if...')
//     var db = await connect();
//     let cargo_types = await db.query('SELECT `id`,`name`, description, attributes \
//          FROM `cargo_type` \
//          WHERE id >0')
//     db.end();
//     var fields = cargo_types[0];
//     // console.log('*** subCategories ***')
//     // console.log(fields.length)
//     if (!fields.length) {
//       res.status(200).json({
//         message: "cargo_types empty",
//         cargo_types: fields
//       })
//     } 
//     res.status(200).json({
//       message: "cargo_types list",
//       cargo_types: fields
//     })
//   } catch (error) {
//     console.log(error.message)
//     res.send(400, error.message)
//   }
// })


module.exports = router
