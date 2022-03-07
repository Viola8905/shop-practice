import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productitem/ProductItem";
const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;
  return (
    <div className="products">
      {products.map((product) => {
        return <ProductItem  key = {product._id} product={product} />;
      })}
    </div>
  );
};

export default Products;
