import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { localStorageCart, ticketHandler } from "../redux/actions";
import { useNavigate } from "react-router-dom";

export default function Ticketing() {
  const entradas = useSelector((state) => state.entradas);
  const [regulartickets, setregularTickets] = useState(0);
  const [childrentickets, setchildrenTickets] = useState(0);
  const [eldertickets, setelderTickets] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let dispatchregular = {
    id: 7,
    title: "Ticket regular",
    unit_price: entradas[1].unit_price,
    quantity: regulartickets,
  };
  let dispatchchildren = {
    id: 8,
    title: "Ticket para niños",
    unit_price: entradas[0].unit_price,
    quantity: childrentickets,
  };
  let dispatchelder = {
    id: 9,
    title: "Ticket para mayores de 65 años",
    unit_price: entradas[2].unit_price,
    quantity: eldertickets,
  };

  const regularticketSubstraction = () => {
    if (regulartickets > 0) setregularTickets(regulartickets - 1);
  };
  const regularticketAdd = () => {
    setregularTickets(regulartickets + 1);
  };
  const childrenticketSubstraction = () => {
    if (childrentickets > 0) setchildrenTickets(childrentickets - 1);
  };
  const childrenticketAdd = () => {
    setchildrenTickets(childrentickets + 1);
  };
  const elderticketSubstraction = () => {
    if (eldertickets > 0) setelderTickets(eldertickets - 1);
  };
  const elderticketAdd = () => {
    setelderTickets(eldertickets + 1);
  };
  const handleTickets = () => {
    if (dispatchregular.quantity > 0) {
      dispatch(ticketHandler(dispatchregular));
    }
    if (dispatchregular.quantity > 0) {
      dispatch(ticketHandler(dispatchchildren));
    }
    if (dispatchregular.quantity > 0) {
      dispatch(ticketHandler(dispatchelder));
    }
    navigate(`/cart`);
  };
  //ESTE LOCAL STORAGE ESTA RE BUG NO DESCOMENTAR EXPLOTA TODO A LA MIERDA
  // useEffect(() => {
  //   if (dispatchregular.quantity > 0) {
  //     localStorage.setItem("ticketing", JSON.stringify(dispatchregular));
  //   } else if (dispatchchildren.quantity > 0) {
  //     localStorage.setItem("ticketing", JSON.stringify(dispatchchildren));
  //   } else if (dispatchelder.quantity > 0) {
  //     localStorage.setItem("ticketing", JSON.stringify(dispatchelder));
  //   }
  // }, [dispatchregular, dispatchchildren, dispatchelder]);

  useEffect(() => {
    let backupCart = JSON.parse(localStorage.getItem("ticketing"));
    if (backupCart !== null && backupCart !== 0) {
      dispatch(localStorageCart(backupCart));
    }
  }, []);

  let total =
    dispatchregular.unit_price * regulartickets +
    dispatchelder.unit_price * eldertickets +
    dispatchchildren.unit_price * childrentickets;

  return (
    <div>
      SELECCIONA TUS ENTRADAS
      <div>
        {" "}
        <button onClick={() => childrenticketSubstraction()}>-</button>
        {childrentickets} <button onClick={() => childrenticketAdd()}>+</button>
        Entradas para niños
      </div>
      <div>
        {" "}
        <button onClick={() => regularticketSubstraction()}>-</button>
        {regulartickets} <button onClick={() => regularticketAdd()}>+</button>
        Entradas para mayores de 13 años
      </div>
      <div>
        {" "}
        <button onClick={() => elderticketSubstraction()}>-</button>
        {eldertickets} <button onClick={() => elderticketAdd()}>+</button>
        Entradas para personas mayores de 65 años o con discapacidad
      </div>
      <button onClick={() => handleTickets()}>Selecciona tu sala!</button>
      TOTAL:{total}
    </div>
  );
}
