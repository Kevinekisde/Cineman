import React, { useEffect } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import ShoppingPoster from "../organisms/ShoppingPoster";
import ShoppingTotal from "../organisms/ShoppingTotal";
import {
  Container,
  Content,
  Purchase,
  PurchaseInfo,
} from "./SuccessfulPurchaseStyles";
import { NavComponent } from "../sections/NavComponentStyles";
import { useNavigate } from "react-router-dom";
import {
  checkOutClear,
  ClearCart,
  setPurchaseTickets,
} from "../../redux/actions";
import { useDispatch } from "react-redux";

const SuccessfulPurchase = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ClearCart());
    dispatch(checkOutClear());
    dispatch(setPurchaseTickets([]));
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <NavComponent>
        <span>Select your tickets</span>
        <div />
        <span>Select your seats</span>
        <div />
        <span>Confectionery</span>
        <div />
        <span>Confirm your purchase</span>
        <div />
        <span style={{ color: "#8ce3ff", border: "1px solid #8ce3ff" }}>
          Successful purchase
        </span>
      </NavComponent>
      <Content>
        <Purchase>
          <PurchaseInfo>
            <h2>Your purchase has been successful</h2>
            <h2>You can see your purchase in your email</h2>
            <button onClick={() => navigate("/home")}>Home</button>
            <p>ID: 4590615653</p>
          </PurchaseInfo>
          <div>
            {/* <ShoppingPoster /> */}
            {/* <ShoppingTotal /> */}
          </div>
        </Purchase>
      </Content>
      <Footer />
    </Container>
  );
};

export default SuccessfulPurchase;
