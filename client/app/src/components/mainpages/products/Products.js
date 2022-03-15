import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productitem/ProductItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";
const Products = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsApi.products;
	const [isAdmin] = state.userApi.isAdmin


  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data.products);
      //console.log(res.data.products);
    };
    getProducts();
  }, [setProducts]);
  return (
    <>
      <div className="products">
        {products.map((product) => {
          return <ProductItem key={product._id} product={product}  isAdmin={isAdmin}/>;
        })}
      </div>
      {products.length === 0 && <Loading />}
    </>
  );
};

export default Products;
