import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkOut,
  getDetail,
  getRoom,
  localStorageCart,
  localStorageFunction,
  RemoveAllFromCart,
  RemoveOneFromCart,
  setPurchaseTickets,
} from "../../redux/actions";
import CartItem from "../CartItem";
import Entradas from "../Entradas";
import {
  Buttons,
  Container,
  Details,
  Total,
  TotalInfo,
} from "./ShoppingTotalStyles";

const ShoppingTotal = ({ handleTickets, output, idFunction }) => {
  // console.log(window.location.pathname);
  let cart = useSelector((state) => state.cart);
  let idMovie = useSelector((state) => state.functionDetail.movie);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let tickets = useSelector((state) => state.selectedTickets);

  //-----------------CART----------------------
  const checkOutHandler = () => {
    dispatch(checkOut([...cart, tickets]));
    navigate(`/confirmpurchase`);
  };
  const deleteFromCart = (id, all = false) => {
    all
      ? dispatch(RemoveAllFromCart(id, all))
      : dispatch(RemoveOneFromCart(id));
  };

  const HandleReturns = () => {
    window.location.pathname == "/selecttickets" &&
      navigate("/detail/" + idMovie.id);
    window.location.pathname == "/selectseat" && navigate("/selecttickets");
    window.location.pathname == "/confectionery" &&
      dispatch(checkOut([...cart, tickets])) &&
      navigate(`/selectseat`);
    window.location.pathname == "/confirmpurchase" &&
      navigate("/confectionery");
  };

  //---------------CART----------------
  useEffect(() => {
    let localStor = JSON.parse(localStorage.getItem("ticketstotal"));
    // console.log(localStor);
    if (localStor !== null || localStor?.length > 0) {
      dispatch(setPurchaseTickets(localStor));
    }
  }, []);

  useEffect(() => {
    let cartlocalStor = JSON.parse(localStorage.getItem("cart"));
    if (cartlocalStor !== null || cartlocalStor?.length > 0) {
      dispatch(localStorageCart(cartlocalStor));
    }
  }, []);
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart)); //SI NO FUNCIONA EL LOCAL STORAGE DESCOMENTAR ESTO A VECES TROLEA SIN RAZON
  // }, [cart]);
  //----------------------TICKETING--------------------
  // useEffect(() => {
  //   let localStor = localStorage.getItem("ticketstotal");
  //   localStor != null && JSON.parse(localStor);
  // }, []);

  //-----------------TICKETING-----------------------
  //-----------------SELECTSEATS----------------------
  const ticketscomprados = useSelector((state) => state.selectedTickets);
  const [disable, setDisable] = useState(true);
  const totaltickets = ticketscomprados
    ?.map((el) => el.quantity)
    .reduce((a, b) => a + b, 0);
  const salaOcupada = useSelector((state) => state.filledSeats);
  const [compras, setCompras] = useState([]);
  // const [output, setOutput] = useState([]);
  let t0 = ticketscomprados[0]?.quantity;
  let t1 = ticketscomprados[1]?.quantity;
  let t2 = ticketscomprados[2]?.quantity;
  // console.log(`ticketstotales: ${totaltickets}`);
  // console.log(`asientos: ${salaOcupada}`);
  useEffect(() => {
    if (totaltickets == salaOcupada) {
      setDisable(false);
    }
    if (totaltickets > salaOcupada) {
      setDisable(true);
    }
    if (totaltickets < salaOcupada) setDisable(true);
  }, [salaOcupada, disable]);

  function comprar() {
    if (output == 0) {
      return window.alert("Por favor selecciona tus asientos");
    }
    for (let i = 0; i < output?.length; i++) {
      if (t0) {
        ticketscomprados[0].seats.push(output[i]);
        t0--;
      } else if (t1 && !t0) {
        ticketscomprados[1].seats.push(output[i]);
        t1--;
      } else if (t2 && !t1) {
        ticketscomprados[2].seats.push(output[i]);
        t2--;
      }
    }
    // dispatch(setSeats(idFunction, output));  //  <--- esto setea el asiento(s) en comprado en la db
    // dispatch(setPurchaseTickets(ticketscomprados)); //esto va a quedar hasta que se haga la compra

    localStorage.setItem("ticketsLcs", JSON.stringify(ticketscomprados));
    navigate("/confectionery");

    setCompras([]);
  }

  //------------------SELECTSEATS----------------
  //------------------TOTAL-------------------------
  const allPrices = [
    ...cart.map((item) => item.unit_price * item.quantity),
    ...tickets.map((item) => item.unit_price * item.quantity),
  ];
  //------------------TOTAL--------------------------
  return (
    <Container>
      <TotalInfo>
        <h2>Your purchase</h2>
        <Details>
          <div>
            {tickets?.map((ticket) => (
              <Entradas data={ticket} />
            ))}
          </div>
          {cart.map((item, index) => (
            <CartItem
              key={index}
              data={item}
              deleteFromCart={deleteFromCart}
            ></CartItem>
          ))}
        </Details>
        <p>*Charge for service $1</p>
        <Total>
          <span>Total</span>
          <span>
            {/* {allPrices.length > 0
              ? `Total= $${allPrices.reduce((a, b) => a + b, 0)}`
              : navigate("/home")} */}
            {`Total= $${allPrices.reduce((a, b) => a + b, 0)}`}
          </span>
        </Total>
      </TotalInfo>
      <Buttons>
        <button onClick={() => HandleReturns()}>return</button>
        {window.location.pathname == "/selecttickets" ? (
          <button onClick={() => handleTickets()}>continue</button>
        ) : window.location.pathname == "/selectseat" ? (
          <button onClick={() => comprar()} id="checkout" disabled={disable}>
            continue
          </button>
        ) : window.location.pathname == "/confectionery" ? (
          <button onClick={() => checkOutHandler()}>continue</button>
        ) : (
          <button onClick={() => checkOutHandler()}>continue</button>
        )}
      </Buttons>
    </Container>
  );
};
export default ShoppingTotal;
