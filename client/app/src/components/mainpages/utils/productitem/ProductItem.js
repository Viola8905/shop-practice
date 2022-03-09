import React from 'react'
import { Link } from 'react-router-dom';
import BtnRender from './BtnRender';

const ProductItem = ({product, isAdmin}) => {
	return (
    <div className="product_card">
			{isAdmin && <input type='checkbox' checked={product.cheked}/>}
      <img src={product.images.url} alt="" />

      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>

     <BtnRender product={product}/>
    </div>
  );
}

export default ProductItem