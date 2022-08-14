const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env'});

const transporter = nodemailer.createTransport({
	service: "gmail",
  	port: 587,
  	debug: true,
	auth: {
	  	user: process.env.MAIL_USERNAME,
	  	pass: process.env.MAIL_PASSWORD
	}
});

module.exports = transporter;