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
import Categories from './categories/Categories';
import CreateProduct from './createProduct/CreateProduct';
export default function Pages() {
	const state = useContext(GlobalState);
	const [isLogged] = state.userApi.isLogged;
	const [isAdmin] = state.userApi.isAdmin;
	return (
    <Routes>
      <Route exact path="/" element={<Products />} />
      <Route exact path="/detail/:id" element={<DetailProduct />} />
      <Route exact path="/login" element={isLogged ? NotFound : <Login />} />
      <Route
        exact
        path="/category"
        element={isAdmin ? <Categories /> : NotFound}
      />
      <Route
        exact
        path="/create_product"
        element={isAdmin ? <CreateProduct /> : NotFound}
      />
      <Route
        exact
        path="/edit_product/:id"
        element={isAdmin ? <CreateProduct /> : NotFound}
      />
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
