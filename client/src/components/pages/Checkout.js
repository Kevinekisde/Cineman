import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "./Checkout.module.css";
import Botonmp from "../utils/Botonmp";
import { localStorageCart } from "../../redux/actions";
import Paypal from "../../components/utils/Paypal";
import BuyPagination from "../BuyPagination";
//FALTA AGREGAR LA SESION EN LOCAL STORAGE.
//FALTA LIMITAR EL ACCESO UNICAMENTE A LOS USUARIOS REGISTRADOS!
export default function Checkout({ payOption }) {
  const cart = useSelector((state) => state.cart);
  const tickets = useSelector((state) => state.selectedTickets);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // cart.length === 0 && tickets.length === 0 && navigate("/home");
    // let backupCart = localStorage.getItem("cart");
    // if (backupCart !== null) {
    //   dispatch(localStorageCart(JSON.parse(backupCart)));
    // }
  }, []);

  const [pay, setPay] = useState(null);
  const orderData = cart.concat(tickets);
  console.log(orderData);

  const allCart = cart.map((item) => item.unit_price * item.quantity);
  const allTickets = tickets.map((item) => item.unit_price * item.quantity);
  return (
    <div className={s.root}>
      <div>
        <BuyPagination select={4} />
        <h1>Este es tu ticket</h1>
        {cart.map((el) => (
          <h4>
            {el.title == "TICKETS"
              ? `${el.title} $${el.unit_price}, ${el.quantity} units `
              : el.quantity == 1
              ? `${el.title} $${el.unit_price}.00 `
              : `${el.title} $${el.unit_price} x ${el.quantity}u = $${
                  el.unit_price * el.quantity
                }.00`}
          </h4>
        ))}
        {tickets.map((el) => (
          <h4>
            {el.title
              ? `${el.title} $${el.unit_price}, ${el.quantity} units = $${
                  el.unit_price * el.quantity
                } `
              : el.quantity == 1
              ? `$${el.unit_price}.00 `
              : `$${el.unit_price} x ${el.quantity}u = $${
                  el.unit_price * el.quantity
                }.00`}
          </h4>
        ))}
        <h3>
          Total=$
          {allCart.reduce((a, b) => a + b, 0) +
            allTickets.reduce((a, b) => a + b, 0)}
        </h3>

        <button onClick={() => setPay("mp")}>Pagar con MP</button>
        <button onClick={() => setPay("paypal")}>Pagar con Paypal</button>
        {pay == "mp" ? (
          <Botonmp orderData={orderData} />
        ) : pay == "paypal" ? (
          <Paypal orderData={orderData} />
        ) : (
          <></>
        )}

        <button onClick={() => navigate("/confectionery")}>
          Volver al carrito
        </button>
      </div>
    </div>
  );
}
