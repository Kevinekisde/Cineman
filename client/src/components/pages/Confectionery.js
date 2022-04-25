import React from "react";
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
} from "../../redux/actions";

import Entradas from "../Entradas";
import { useEffect } from "react";

// {/* <div>
//   <h3>Productos</h3>
//   <div>
//     {allPrices > 0
//       ? `Total= $${allPrices.reduce((a, b) => a + b, 0)}`
//       : navigate("/home")}
//   </div>
//   <button onClick={checkOutHandler}>Despachar</button>
// // </div>;

const Confectionery = () => {
  const cart = useSelector((state) => state.cart);
  const tickets = useSelector((state) => state.selectedTickets);
  const navigate = useNavigate();

  const product = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const addToCart = (id) => {
    dispatch(AddtoCart(id));
  };
  const deleteFromCart = (id, all = false) => {
    all
      ? dispatch(RemoveAllFromCart(id, all))
      : dispatch(RemoveOneFromCart(id));
  };

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
            <NavFood>
              <ul>
                <li>Combos</li>
                <li>Snacks</li>
                <li>Drinks</li>
                <li>Ice creams</li>
              </ul>
            </NavFood>
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
