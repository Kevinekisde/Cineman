import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  setSalas,
  getSala,
  getFunction,
  setPurchaseTickets,
  fillSeats,
} from "../../redux/actions";

import img from "../../img/btc.png";
import s from "../Styles/ButacasUser.module.css";

import Footer from "../sections/Footer";
import Header from "../sections/Header";
import ShoppingPoster from "../organisms/ShoppingPoster";
import ShoppingTotal from "../organisms/ShoppingTotal";
import {
  Container,
  Content,
  SeatsContent,
  SelectSeat,
} from "./SelectSeatsStyles";
import { NavComponent } from "../sections/NavComponentStyles";
// import ButacasUser from "../ButacasUser";

const SelectSeats = () => {
  const dispatch = useDispatch();
  const sala = useSelector((state) => state.room); //pa ver los asientos totales disponibles de cada sala
  const ticketscomprados = useSelector((state) => state.selectedTickets);
  // console.log(ticketscomprados);
  const [compras, setCompras] = useState([]);
  const [output, setOutput] = useState([]);

  // -----------------------------------------------------------------------------------------------------------
  const currentFunction = useSelector((state) => state.functions); //hardcodeada pa traer todas las funciones |
  const idFunction = "6266bde20952646570cdbde5";
  const idRoom = currentFunction[0]?.sala; //id de la sala                                                    |
  // esto se cambia por la funcion que se seleccione en detail---------------------------------------------------

  let comprados = currentFunction[0]?.occupied_seats;
  const [contador, setContador] = useState(1);
  const navigate = useNavigate();
  const alltickets = ticketscomprados?.map((el) => el.quantity);
  const elreducido = alltickets.reduce((a, b) => a + b, 0);

  function setSeat(id) {
    if (alltickets.reduce((a, b) => a + b, 0) > contador - 1) {
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
      dispatch(fillSeats(contador));
    }
  }

  function unSetSeat(id) {
    let nuevaSala = sala.map((seat) => {
      setContador(contador - 1);
      if (seat.id === id) {
        let nuevasCompras = compras.filter((compra) => {
          return compra.id !== id;
        });
        setCompras(nuevasCompras);
        return { ...seat, status: "disponible" };
      } else {
        return seat;
      }
    });

    dispatch(setSalas(nuevaSala));
    dispatch(fillSeats(contador - 2));
  }

  let t0 = ticketscomprados[0]?.quantity;
  let t1 = ticketscomprados[1]?.quantity;
  let t2 = ticketscomprados[2]?.quantity;

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
    // console.log(output);
    // console.log(ticketscomprados);

    dispatch(getFunction(idFunction));
  }, [idFunction, output]);

  function comprar() {
    //falta despachar esto

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
    <Container>
      <Header />
      <NavComponent>
        <span>Select your tickets</span>
        <div />
        <span style={{ color: "#8ce3ff", border: "1px solid #8ce3ff" }}>
          Select your seats
        </span>
        <div />
        <span>Confectionery</span>
        <div />
        <span>Confirm your purchase</span>
        <div />
        <span>Successful purchase</span>
      </NavComponent>

      <Content>
        <SeatsContent>
          <SelectSeat>
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
                      className={
                        seat.select ? `${s.imgseat}` : `${s.imgnoseat}`
                      }
                      src={img}
                      alt=""
                    />
                  }
                </div>
              ))}
            </div>
          </SelectSeat>

          <div>
            <ShoppingPoster />
            <ShoppingTotal comprar={comprar} />
          </div>
        </SeatsContent>
      </Content>

      <Footer />
    </Container>
  );
};

export default SelectSeats;
