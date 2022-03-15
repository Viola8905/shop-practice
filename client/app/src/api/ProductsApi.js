import React, { useEffect, useState } from 'react'
import axios from 'axios'
const ProductsApi = () => {
	const [products,setProducts] = useState([]);
	const [callback,setCallback] = useState(false)
	
	useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.products);
      //console.log(res.data.products);
    };
    getProducts();
  }, [callback]);
	return {
		products: [products, setProducts],
		callback: [callback,setCallback],
	}
}

export default ProductsApi