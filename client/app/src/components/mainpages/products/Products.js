import React, { useContext } from 'react'

import {GlobalState } from '../../../GlobalState'
import ProductItem from '../../ProductItem'
const Products = () => {
	const state = useContext(GlobalState)
	const [products] = state.productsApi.products
	return (
		<div className='products'>{
		
		}</div>
	)
}

export default Products