import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productitem/ProductItem";
import Loading from "../utils/loading/Loading";
const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsApi.products;
	const [isAdmin] = state.userApi.isAdmin
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
