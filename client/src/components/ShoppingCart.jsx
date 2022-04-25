import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import CartItem from "./CartItem";
import "./ShoppingCart.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddtoCart,
  RemoveOneFromCart,
  RemoveAllFromCart,
  ClearCart,
  checkOut,
  localStorageCart,
  localStorageTickets,
} from "../redux/actions.js";
import BuyPagination from "./BuyPagination";
import Entradas from "./Entradas";
const ShoppingCart = () => {
  const cart = useSelector((state) => state.cart);
  const tickets = useSelector((state) => state.selectedTickets);

  // useEffect(() => {
  //   if (cart.length > 0) {
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //   }
  // }, [cart]);

  // useEffect(() => {
  //   let backupCart = localStorage.getItem("cart");
  //   if (backupCart !== null) {
  //     dispatch(localStorageCart(JSON.parse(backupCart)));
  //   }
  //   let backupTickets = localStorage.getItem("tickets");
  //   if (backupTickets !== null) {
  //     dispatch(localStorageTickets(JSON.parse(backupTickets)));
  //   }
  // }, []);

  const product = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCart = (id) => {
    dispatch(AddtoCart(id));
  };
  const deleteFromCart = (id, all = false) => {
    all
      ? dispatch(RemoveAllFromCart(id, all))
      : dispatch(RemoveOneFromCart(id));
  };
  const clearCart = () => {
    dispatch(ClearCart());
    document.querySelector("#valor").quantity = 0;
  };
  const checkOutHandler = () => {
    dispatch(checkOut([...cart, tickets]));
    navigate(`/checkout`);
  };

  const allPrices = [
    ...cart.map((item) => item.unit_price * item.quantity),
    ...tickets.map((item) => item.unit_price * item.quantity),
  ];

  console.log(allPrices);

  return (
    <div>
      <BuyPagination select={3} /> <h2>Carrito de Compras</h2>
      <h3>Productos</h3>
      <article className="grid-responsive">
        {product.map((product) => (
          <ProductItem
            key={product.id}
            data={product}
            addToCart={addToCart}
            deleteFromCart={deleteFromCart}
          ></ProductItem>
        ))}
      </article>
      <h3>Carrito</h3>
      <article className="grid-responsive">
        <button onClick={clearCart}>Limpiar Carrito</button>
        {tickets?.map((ticket) => (
          <Entradas data={ticket} />
        ))}
        {cart.map((item, index) => (
          <CartItem
            key={index}
            data={item}
            deleteFromCart={deleteFromCart}
          ></CartItem>
        ))}
      </article>
      <div>
        {allPrices > 0
          ? `Total= $${allPrices.reduce((a, b) => a + b, 0)}`
          : navigate("/home")}
      </div>
      <button onClick={checkOutHandler}>Despachar</button>
    </div>
  );
};

export default ShoppingCart;
