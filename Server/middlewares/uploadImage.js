const path = require('path');
const multer = require('multer');
const shortid = require('shortid');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/products');
	},
	filename: (req, file, cb) => {
		const fileName = `${ file.fieldname }-${ shortid.generate() + path.extname(file.originalname) }`;
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