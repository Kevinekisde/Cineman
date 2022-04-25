import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ticketHandler, setPurchaseTickets } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import BuyPagination from "../BuyPagination";

export default function Ticketingnew() {
  const entradas = useSelector((state) => state.entradas);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([
    {
      id: 7,
      title: "Ticket regular",
      unit_price: entradas[1].unit_price,
      quantity: 0,
      seats: [],
    },
    {
      id: 8,
      title: "Ticket para niños",
      unit_price: entradas[0].unit_price,
      quantity: 0,
      seats: [],
    },
    {
      id: 9,
      title: "Ticket para mayores de 65 años",
      unit_price: entradas[2].unit_price,
      quantity: 0,
      seats: [],
    },
  ]);

  const [total, setTotal] = useState(0);

  const handleChange = (id, operation) => {
    let find = tickets.find((el) => el.id === id);
    let newTickets = tickets.filter((el) => el.id !== id);

    if (operation === "sum") {
      setTotal(total + find.unit_price);
      find.quantity++;
    }
    if (operation === "rest") {
      if (find.quantity !== 0) {
        setTotal(total - find.unit_price);
        find.quantity--;
      }
    }
    setTickets([...newTickets, find]);
  };

  // useEffect(() => {
  //   // localStorage.clear();
  //   const ticketsBackup = localStorage.getItem("tickets");
  //   const totalBackup = localStorage.getItem("ticketstotal");
  //   if (ticketsBackup !== null) {
  //     setTickets(JSON.parse(ticketsBackup));
  //   }
  //   if (totalBackup !== null) {
  //     setTotal(Number(totalBackup));
  //   }
  // }, []);

  const handleTickets = async (r) => {
    if (total === 0) {
      window.alert("andamos bien pedazo de hijo de puta");
    } else {
      localStorage.setItem("tickets", JSON.stringify(tickets));
      localStorage.setItem("ticketstotal", total.toString());
      dispatch(setPurchaseTickets(r));
      navigate(`/selectseats`);
    }
  };

  return (
    <div>
      <BuyPagination select={1} />
      <h1>SELECCIONA TUS ENTRADAS</h1>
      <div>
        <button onClick={() => handleChange(8, "rest")}>-</button>
        {tickets.find((el) => el.id === 8).quantity}
        <button onClick={() => handleChange(8, "sum")}>+</button>
        Entradas para niños
      </div>
      <div>
        <button onClick={() => handleChange(7, "rest")}>-</button>
        {tickets.find((el) => el.id === 7).quantity}
        <button onClick={() => handleChange(7, "sum")}>+</button>
        Entradas para mayores de 13 años
      </div>
      <div>
        <button onClick={() => handleChange(9, "rest")}>-</button>
        {tickets.find((el) => el.id === 9).quantity}
        <button onClick={() => handleChange(9, "sum")}>+</button>
        Entradas para personas mayores de 65 años o con discapacidad
      </div>
      <button onClick={() => handleTickets(tickets)}>
        Selecciona tu sala!
      </button>
      TOTAL:{total}
    </div>
  );
}
