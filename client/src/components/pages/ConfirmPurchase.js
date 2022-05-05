import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPurchaseTickets } from "../../redux/actions";
import ShoppingPoster from "../organisms/ShoppingPoster";
import ShoppingTotal from "../organisms/ShoppingTotal";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import { NavComponent } from "../sections/NavComponentStyles";
import Botonmp from "../utils/Botonmp";
import {
  ConfirmContent,
  ConfirmInfo,
  Container,
  Content,
  Form,
  Input,
  Methods,
} from "./ConfirmPurchaseStyles";

const ConfirmPurchase = () => {
  const cart = useSelector((state) => state.cart);
  const tickets = useSelector((state) => state.selectedTickets);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pay, setPay] = useState(null);
  const orderData = cart.concat(tickets);

  const funcion = useSelector((state) => state.functionDetail);

  console.log(orderData);

  const allCart = cart.map((item) => item.unit_price * item.quantity);
  const allTickets = tickets.map((item) => item.unit_price * item.quantity);
  useEffect(() => {
    let localStor = JSON.parse(localStorage.getItem("ticketsLcs"));
    // console.log(localStor);
    if (localStor !== null) {
      dispatch(setPurchaseTickets(localStor));
    }
  }, []);

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
        <span style={{ color: "#8ce3ff", border: "1px solid #8ce3ff" }}>
          Confirm your purchase
        </span>
        <div />
        <span>Successful purchase</span>
      </NavComponent>
      <Content>
        <ConfirmContent>
          <ConfirmInfo>
            <Input>
              <h2>TICKET</h2>
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {/* <label>
                  Name
                  <input type="text" />
                </label>
                <label>
                  Email
                  <input type="text" />
                </label> */}

                {cart.map((el) => (
                  <h3>
                    {el.title == "TICKETS"
                      ? `${el.title} $${el.unit_price}, ${el.quantity} units `
                      : el.quantity == 1
                      ? `${el.title} $${el.unit_price}.00 `
                      : `${el.title} $${el.unit_price} x ${el.quantity}u = $${
                          el.unit_price * el.quantity
                        }.00`}
                  </h3>
                ))}
                {tickets.map((el) => (
                  <h3>
                    {el.title
                      ? `${el.title} $${el.unit_price}, ${
                          el.quantity
                        } units = $${el.unit_price * el.quantity} `
                      : el.quantity == 1
                      ? `$${el.unit_price}.00 `
                      : `$${el.unit_price} x ${el.quantity}u = $${
                          el.unit_price * el.quantity
                        }.00`}
                  </h3>
                ))}

                <h3>
                  Total=$
                  {allCart.reduce((a, b) => a + b, 0) +
                    allTickets.reduce((a, b) => a + b, 0)}
                </h3>
              </Form>
            </Input>
            <Methods style={{ marginTop: "20px" }}>
              <img
                src="/images/MercadoPago.png"
                alt=""
                onClick={() => setPay("mp")}
                style={
                  pay == "mp" ? { display: "none" } : { cursor: "pointer" }
                }
              />
              {/* <img src="/images/PayPal.png" alt="" /> */}
            </Methods>
            {pay == "mp" && <Botonmp funcion={funcion} orderData={orderData} />}
          </ConfirmInfo>
          <div>
            <ShoppingPoster />
            <ShoppingTotal />
          </div>
        </ConfirmContent>
      </Content>
      <Footer />
    </Container>
  );
};

export default ConfirmPurchase;
