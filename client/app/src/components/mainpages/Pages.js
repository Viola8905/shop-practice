import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/notfound/NotFound';
import DetailProduct from './detailProduct/DetailProduct';
import { GlobalState } from '../../GlobalState';
import PayPal from './cart/PayPal';
export default function Pages() {
	const state = useContext(GlobalState);
	const [isLogged] = state.userApi.isLogged;
	return (
    <Routes>
      <Route exact path="/" element={<Products />} />
      <Route exact path="/detail/:id" element={<DetailProduct />} />
      <Route exact path="/login" element={isLogged ? NotFound : <Login />} />
      <Route
        exact
        path="/register"
        element={isLogged ? NotFound : <Register />}
      />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/pay" element={<PayPal />} />
      <Route exact path="*" element={<NotFound />} />
    </Routes>
  );
}
