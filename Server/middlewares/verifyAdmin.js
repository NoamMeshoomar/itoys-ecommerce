const Users = require('../models/Users');

module.exports = async (req, res, next) => {
	const { isAdmin } = await Users.findById(req.user._id);

	if(isAdmin)
		next();
	else
		return res.status(403).json({ error: 'אין לך הרשאות לבצע שינויים אלה' });
}