const path = require('path');
const multer = require('multer');
const shortid = require('shortid');
const sftpStorage = require("multer-sftp");
// const Client = require("ssh2-sftp-client");

// const sftp = new Client();

// sftp.connect({
//     host: "server244.web-hosting.com",
//     port: 21098,
//     username: "projwhwl",
//     password: "mrsja0xEwGsp647lm"
// })
// .then(() => sftp.list("/home/projwhwl/itoys-uploads"))
// .then((data) => {
//     console.log(data);
// })
// .catch((err) => console.error(err));

const storage = sftpStorage({
    sftp: {
        host: "server244.web-hosting.com",
        port: 21098,
        username: "projwhwl",
        password: "mrsja0xEwGsp647lm"
    },
    destination: (req, file, cb) => {
        cb(null, "home/projwhwl/itoys-uploads/products/");
    },
	filename: (req, file, cb) => {
		const fileName = `/${file.fieldname}-${shortid.generate() + path.extname(file.originalname)}`;
		cb(null, fileName);
	}
});

const upload = multer({ 
	storage,
	fileFilter: (req, file, cb) => {
		const fileType = path.extname(file.originalname);

		if(fileType === '.png' || fileType === '.jpg' || fileType === '.jpeg')
			cb(null, true);
		else
			cb(new Error('יש להעלות רק קבצי תמונה'), false);
	}
 });

module.exports = upload;