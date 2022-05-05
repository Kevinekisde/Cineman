import React, { useState } from "react";
import Combo from "../organisms/Combo";
import ShoppingPoster from "../organisms/ShoppingPoster";
import ShoppingTotal from "../organisms/ShoppingTotal";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import { NavComponent } from "../sections/NavComponentStyles";
import {
  Catalog,
  ConfectioneryContent,
  Container,
  Content,
  NavFood,
  SelectConfectionery,
} from "./ConfectioneryStyles";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddtoCart,
  RemoveOneFromCart,
  RemoveAllFromCart,
  ClearCart,
  checkOut,
  getProducts,
  setPurchaseTickets,
  localStorageCart,
} from "../../redux/actions";
import { useEffect } from "react";

const Confectionery = () => {
  let cart = useSelector((state) => state.cart);
  const selectedTickets = useSelector((state) => state.selectedTickets);
  const navigate = useNavigate();

  const product = useSelector((state) => state.products);
  const premiumProduct = useSelector((state) => state.PromosPremium);
  const dispatch = useDispatch();

  const addToCart = (id) => {
    dispatch(AddtoCart(id));
  };
  const deleteFromCart = (id, all = false) => {
    all
      ? dispatch(RemoveAllFromCart(id, all)) &&
        console.log(cart) &&
        localStorage.setItem("cart", JSON.stringify(cart))
      : dispatch(RemoveOneFromCart(id)) &&
        localStorage.setItem("cart", JSON.stringify(cart));
  };

  useEffect(() => {
    let localStor = JSON.parse(localStorage.getItem("ticketsLcs"));
    // console.log(localStor);
    if (localStor !== null) {
      dispatch(setPurchaseTickets(localStor));
    }
    dispatch(getProducts());
  }, [dispatch]);
  selectedTickets.length == 0 &&
    window.location.pathname == "/confectionery" &&
    navigate("/home");
  useEffect(() => {
    let cartlocalStor = JSON.parse(localStorage.getItem("cart"));
    if (cartlocalStor !== null || cartlocalStor?.length > 0) {
      dispatch(localStorageCart(cartlocalStor));
    }
  }, []);
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);
  return (
    <Container>
      <Header />
      <NavComponent>
        <span>Select your tickets</span>
        <div />
        <span>Select your seats</span>
        <div />
        <span style={{ color: "#8ce3ff", border: "1px solid #8ce3ff" }}>
          Confectionery
        </span>
        <div />
        <span>Confirm your purchase</span>
        <div />
        <span>Successful purchase</span>
      </NavComponent>
      <Content>
        <ConfectioneryContent>
          <SelectConfectionery>
            <Catalog>
              {/* <article className="grid-responsive"> */}

              {product.map((product) => (
                <Combo
                  key={product.id}
                  data={product}
                  addToCart={addToCart}
                  deleteFromCart={deleteFromCart}
                ></Combo>
              ))}
            </Catalog>
          </SelectConfectionery>
          <div>
            <ShoppingPoster />
            <ShoppingTotal />
          </div>
        </ConfectioneryContent>
      </Content>
      <Footer />
    </Container>
  );
};

export default Confectionery;
