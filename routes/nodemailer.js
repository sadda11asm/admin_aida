const router = require('express').Router()
const mysql = require('mysql2/promise')
const dbconfig = require('../config/dbconfig')
const nodemailer = require('nodemailer');

async function connect(){
    let con = await mysql.createConnection(dbconfig.dbUsers);
    return con;
}

router.post('/', async function (req, res) {
	// console.log(req.body);
	var idlist = req.body.idlist;
	var subject = req.body.subject;
	var text = req.body.text; 
	var maillist = await getMailList(idlist);
	let mailOptions = {
	    from: '"Saddam sends you hello! 👻" <sadda11asm@yahoo.com>', // sender address
	    to: maillist, // list of receivers
	    subject: subject, // Subject line
	    text: text, // plain text body
	    html: '<b>HTML body</b>' // html body
	};
	try {
		await sendMails(mailOptions);
		res.status(201).json({
			message: "successful mailer",
			options: mailOptions
		})
	} catch (err) {
		// console.log(err.message);
		res.status(400).json({
			message: "unsuccessful mailer",
			error: err.message
		})
	}
})

// sendMails();
async function sendMails(mailOptions) {

	const transporter = nodemailer.createTransport({
	    service: '"Yahoo"',
	    auth: {
	        user: 'sadda11asm@yahoo.com',
	        pass: 'chelsea112'
	    }
	}); 

	await transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
	    return console.log(error);
	}
	console.log('Message sent: %s', info.messageId);
	// Preview only available when sending through an Ethereal account
	// console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	});
	transporter.close()
}

async function getMailList(idlist) {
	var maillist = [];
	var db = await connect();
	for (var i = 0; i<idlist.length; i++) {
		var id = idlist[i];
		var mailinfo = await db.query("SELECT email FROM companies WHERE id = ?", [id]);
		var mail = mailinfo[0][0]["email"];
		console.log(mail);
		maillist.push(mail);
	}
	db.end();
	return maillist;
}


module.exports = router 



