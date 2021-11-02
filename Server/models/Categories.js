const mongoose = require('mongoose');

const categoriesSchema = mongoose.Schema({
	categoryIcon: { type: String },
	categoryName: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('categories', categoriesSchema);