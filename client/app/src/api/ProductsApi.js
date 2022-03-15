import React, { useEffect, useState } from 'react'
import axios from 'axios'
const ProductsApi = () => {
	const [products,setProducts] = useState([]);
	// const getProducts = async () => {
	// 	const res = await axios.get("http://localhost:5000/api/products");
	// 	setProducts(res.data.products)
	// 	//console.log(res.data.products);
	// }
	// useEffect(() => {
	// 	getProducts()
	// },[])
	return {
		products: [products, setProducts]
	}
}

export default ProductsApi