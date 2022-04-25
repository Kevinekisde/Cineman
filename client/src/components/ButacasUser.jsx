import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import img from "../img/btc.png";
import s from "./Styles/ButacasUser.module.css";

import {
  setSalas,
  getSala,
  setSeats,
  getFunction,
  setPurchaseTickets,
} from "../redux/actions";

import BuyPagination from "./BuyPagination";

export default function ButacasUser() {
  const dispatch = useDispatch();
  const sala = useSelector((state) => state.room); //pa ver los asientos totales disponibles de cada sala
  const ticketscomprados = useSelector((state) => state.selectedTickets);
  const [compras, setCompras] = useState([]);
  const [output, setOutput] = useState([]);

  // -----------------------------------------------------------------------------------------------------------
  const currentFunction = useSelector((state) => state.functions); //hardcodeada pa traer todas las funciones |
  const idFunction = "6260e8c6497a55945e4faafc";
  const idRoom = currentFunction[0]?.sala; //id de la sala                                                    |
  // esto se cambia por la funcion que se seleccione en detail---------------------------------------------------

  let comprados = currentFunction[0]?.occupied_seats;
  const [contador, setContador] = useState(0);
  const navigate = useNavigate();
  const alltickets = ticketscomprados?.map((el) => el.quantity);
  const elreducido = alltickets.reduce((a, b) => a + b, 0);
  function setSeat(id) {
    if (alltickets.reduce((a, b) => a + b, 0) > contador) {
      let nuevaSala = sala.map((seat) => {
        if (seat.id === id) {
          let compra = { id: seat.id, fila: seat.fila, columna: seat.columna };
          setOutput((old) => [...old, seat.id]);
          setContador(contador + 1);
          setCompras((old) => [...old, compra]);
          if (seat.columna === 0) return seat;
          else return { ...seat, status: "" };
        } else {
          return seat;
        }
      });
      dispatch(setSalas(nuevaSala));
    }
  }

  function unSetSeat(id) {
    let nuevaSala = sala.map((seat) => {
      if (seat.id === id) {
        let nuevasCompras = compras.filter((compra) => {
          return compra.id !== id;
        });
        setCompras(nuevasCompras);
        setContador(contador - 1);
        return { ...seat, status: "disponible" };
      } else {
        return seat;
      }
    });

    dispatch(setSalas(nuevaSala));
  }

  let t0 = ticketscomprados[0]?.quantity;
  let t1 = ticketscomprados[1]?.quantity;
  let t2 = ticketscomprados[2]?.quantity;
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    if (elreducido == contador) {
      setDisable(false);
    }
    if (elreducido > contador) {
      setDisable(true);
    }
  }, [contador]);
  useEffect(() => {
    dispatch(getSala(idRoom));
  }, [idRoom]);

  for (let i = 0; i < comprados?.length; i++) {
    sala.forEach((el) => {
      if (el.id === comprados[i]) {
        el.status = "vendido";
      }
    });
  }
  useEffect(() => {
    console.log(output);
    console.log(ticketscomprados);

    dispatch(getFunction(idFunction));
  }, [idFunction, output]);

  function comprar() {
    console.log("PESTAÑASTE");
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
    navigate("/cart");
    // let nuevaSala = sala.map((seat) => {
    //   if (seat.status === "") return { ...seat, status: "vendido" };
    //   else return seat;
    // });

    // dispatch(putRoom(nuevaSala, idRoom))
    // dispatch(setSalas(nuevaSala));

    // dispatch(setSeats([salaId, nuevaSala]))  //esto actualiza los asientos ocupados en la funcion en db
    setCompras([]);
  }

  return (
    <>
      <BuyPagination select={2} />

      <div className={s.sillas}>
        {sala?.map((seat) => (
          <div
            className={
              seat.status === "disponible"
                ? ``
                : seat.status === "vendido"
                ? `${s.blocksell}`
                : `${s.blockselect}`
            }
            onClick={() =>
              seat.status === "disponible"
                ? setSeat(seat.id)
                : seat.status === ""
                ? unSetSeat(seat.id)
                : null
            }
          >
            {
              <img
                className={seat.select ? `${s.imgseat}` : `${s.imgnoseat}`}
                src={img}
              />
            }
          </div>
        ))}
      </div>
      <div>
        Lista de compras
        {compras?.map((compra) => {
          let fila = compra.fila.toUpperCase();
          return (
            compra.columna !== 0 && (
              <div>
                <span>Butaca: {fila + compra.columna}</span>
              </div>
            )
          );
        })}
      </div>
      <button id="checkout" onClick={comprar} disabled={disable}>
        Continuar a la compra de Snacks!
      </button>
    </>
  );
}
