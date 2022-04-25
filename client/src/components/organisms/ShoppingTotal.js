import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  checkOut,
  ClearCart,
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

const ShoppingTotal = ({ handleTickets }) => {
  // console.log(window.location.pathname);
  const cart = useSelector((state) => state.cart);
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
  //---------------CART----------------
  //----------------------TICKETING--------------------

  //-----------------TICKETING-----------------------
  //-----------------SELECTSEATS----------------------
  const ticketscomprados = useSelector((state) => state.selectedTickets);
  const [disable, setDisable] = useState(true);
  const totaltickets = ticketscomprados
    ?.map((el) => el.quantity)
    .reduce((a, b) => a + b, 0);
  const salaOcupada = useSelector((state) => state.filledSeats);
  const [compras, setCompras] = useState([]);
  const [output, setOutput] = useState([]);
  let t0 = ticketscomprados[0]?.quantity;
  let t1 = ticketscomprados[1]?.quantity;
  let t2 = ticketscomprados[2]?.quantity;
  console.log(`ticketstotales: ${totaltickets}`);
  console.log(`asientos: ${salaOcupada}`);
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
    //falta despachar esto
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
    // dispatch(setSeats(idFunction, output));
    dispatch(setPurchaseTickets(ticketscomprados)); //esto va a quedar hasta que se haga la compra
    navigate("/confectionery");
    // let nuevaSala = sala.map((seat) => {
    //   if (seat.status === "") return { ...seat, status: "vendido" };
    //   else return seat;
    // });

    // dispatch(putRoom(nuevaSala, idRoom))
    // dispatch(setSalas(nuevaSala));

    // dispatch(setSeats([salaId, nuevaSala]))  //esto actualiza los asientos ocupados en la funcion en db
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
        {
          <a
            href={
              window.location.pathname == "/selecttickets"
                ? "#"
                : "/selecttickets"
            }
          >
            return
          </a>
        }
        {window.location.pathname == "/selecttickets" ? (
          <a href="#" onClick={() => handleTickets()}>
            continue
          </a>
        ) : window.location.pathname == "/selectseat" ? (
          <button
            href="#"
            onClick={() => comprar()}
            id="checkout"
            disabled={disable}
          >
            continue
          </button>
        ) : window.location.pathname == "/cart" ? (
          <a href="#" onClick={() => checkOutHandler()}>
            continue
          </a>
        ) : (
          <a href="#" onClick={() => checkOutHandler()}>
            continue
          </a>
        )}
      </Buttons>
    </Container>
  );
};

export default ShoppingTotal;
