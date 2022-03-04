const Products = require('../models/productModel')


//filter , sorting and pagination
class APIfeatures{
	constructor(query, queryString){
		this.query = query;
		this.queryString = queryString;
	}

	filtering(){
		const queryObj = { ...this.quryString };//queryString = req.query
		const excludedFields = ['page','sort','limit'];
		excludedFields.forEach(el => delete(queryObj[el]));
		let queryStr = JSON.stringify(queryObj)
		queryStr = queryStr.replace(/|b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);
		//gte = grater than or equal
		
		this.query.find(JSON.parse(queryStr))
		return this;
	};
	sorting(){
		if(this.queryString.sort){
			const sortBy = this.queryString.sort.split(',').join('');
			this.query = this.query.sort(sortBy)
		}else{
			this.query = this.query.sort('-createdAt');
		}
		return this;
	};
	paginating(){
		const page = this.queryString.page*1|| 1
		const limit = this.quryString.limit*1 || 3
		const skip = (page-1)*limit;
		this.query = this.query.skip(skip).limit(limit)
		return this;
	};
}
const productCntrl = {
  getProducts: async (req, res) => {
    try {
			const features = new APIfeatures(Products.find(),req.query).filtering().sorting().paginating();
			const products = await features.query;
			res.json({
				status: 'success',
				result: products.length,
				products: products
			})
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