const Categories = require('../models/Categories');

module.exports = {
	getCategories: async (req, res) => {
		const categories = await Categories.find();

		res.status(200).json({ categories });
	},
	createCategory: async (req, res) => {
		const { categoryName } = req.body;

		const newCategory = new Categories({
			categoryName
		});

		await newCategory.save()
		.then(category => res.status(201).json({ 
			message: 'הקטגוריה נוצרה בהצלחה',
			category
	 	}));
	}
}