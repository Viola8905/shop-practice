import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/menu.svg";
import Close from "./icon/xmark.svg";
import Cart from "./icon/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";
const Header = () => {
   const state = useContext(GlobalState);
   const [isLogged] = state.userApi.isLogged;
   const [isAdmin] = state.userApi.isAdmin;
	 const [cart] = state.userApi.cart;
   

const logoutUser = async () => {
  await axios.get("/user/logout");

  localStorage.clear();

	
  window.location.href = "/";
};

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>Logout</Link>
        </li>
      </>
    );
  };
  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="menu" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin Panel" : "Store"}</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Store"}</Link>
        </li>

        {isAdmin && adminRouter()}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login / Register</Link>
          </li>
        )}

        <li>
          <img src={Close} width="30" className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} width="30" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
