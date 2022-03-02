const Products = require('../models/productModel')

const productCntrl = {
  getProducts: async (req, res) => {
    try {
			const products = await Products.find();
			res.json(products)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
			const {product_id, title,price,description,content,images,category} = req.body;
			if(!images) return res.status(400).json({ msg: 'No image uploaded' });
			const product = await Products.findOne({product_id})
			if(product)
				return res.status(400).json({ msg: 'This product already exists' });

			const newProduct= new Products({
				product_id, title: title.toLowerCase(),price,description,content,category
			})

			await newProduct.save()
			res.json({msg:'Created a product'})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
			await Products.findByIdAndDelete(req.params.id)
			res.json({msg:"Delete a product"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
			const {product_id, title,price,description,content,images,category} = req.body;
			if(!images)
				res.status(400).json({ msg: "No image upload" });

			await Products.findOneAndUpdate(
        { _id: req.params.id },
        { product_id, title: title.toLowerCase(), price, description, content, images, category }
      );
			res.json({msg:"Updated a product"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCntrl