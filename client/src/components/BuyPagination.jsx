import s from "../components/Styles/BuyPagination.module.css";
import { useState } from "react";

// import LandingPage from "./LandingPage";

const BuyPagination = ({ select }) => {
  return (
    <div className={s.main}>
      <section className={s.titles}>
        <h3 style={select === 1 ? { color: "red" } : { color: "black" }}>
          Selecciona Tus Entradas
        </h3>
        <h3 style={select == 2 ? { color: "red" } : { color: "black" }}>
          Selecciona Tus Asientos
        </h3>
        <h3 style={select === 3 ? { color: "red" } : { color: "black" }}>
          Snacks
        </h3>
        <h3 style={select === 4 ? { color: "red" } : { color: "black" }}>
          Confirma Tu Compra
        </h3>
        <h3 style={select === 5 ? { color: "red" } : { color: "black" }}>
          Compra Exitosa
        </h3>
      </section>
    </div>
  );
};

export default BuyPagination;
