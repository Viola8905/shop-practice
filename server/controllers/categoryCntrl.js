const Category = require('../models/categoryModel');
const Products = require('../models/productCopy')

const categoryCntrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      //if user have role = 1 --> admin
      // only admin can create,delete and update
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: "this category already exists" });

      const newCategory = new Category({ name });

      await newCategory.save();
      res.json({ msg: "Created a category" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
			const products = await Products.findOne({category : req.params.id})
			if(products) return res.status(400).json({ msg: 'Plase delete all products with this category'});
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "deleted a category " });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const {name} = req.body;
			await Category.findOneAndUpdate({_id: req.params.id}, {name});
			res.json({msg: 'updated a category'})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCntrl