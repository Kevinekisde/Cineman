import React, { useState } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import ShoppingPoster from "../organisms/ShoppingPoster";
import ShoppingTotal from "../organisms/ShoppingTotal";
import {
  ApplyButton,
  Container,
  Content,
  Coupon,
  Discount,
  SelectTicket,
  TicketBox,
  TicketContent,
  Tickets,
} from "./SelectTicketsStyles";
import { NavComponent } from "../sections/NavComponentStyles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setPurchaseTickets } from "../../redux/actions";

const SelectTickets = () => {
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
      dispatch(setPurchaseTickets(tickets));
    
    }
    if (operation === "rest") {
      if (find.quantity !== 0) {
        setTotal(total - find.unit_price);
        find.quantity--;
        dispatch(setPurchaseTickets(tickets));
      }
    }
    setTickets([...newTickets, find]);
  };


  const handleTickets = async () => {
    if (total === 0) {
      window.alert("Debe comprar al menos un ticket.");
    }else{

      localStorage.setItem("tickets", JSON.stringify(tickets));
      localStorage.setItem("ticketstotal", total.toString());
      dispatch(setPurchaseTickets(tickets));
      navigate(`/selectseat`);
    }
  };

  return (
    <Container>
      <Header />
      <NavComponent>
        <span style={{ color: "#8ce3ff", border: "1px solid #8ce3ff" }}>
          Select your tickets
        </span>
        <div />
        <span>Select your seats</span>
        <div />
        <span>Confectionery</span>
        <div />
        <span>Confirm your purchase</span>
        <div />
        <span>Successful purchase</span>
      </NavComponent>
      <Content>
        <TicketContent>
          <SelectTicket>
            <h2>Select your tickets</h2>
            <Tickets>
              <TicketBox>
                <div>
                  <button onClick={() => handleChange(8, "rest")}>-</button>
                  <p>{tickets.find((el) => el.id === 8).quantity}</p>
                  <button onClick={() => handleChange(8, "sum")}>+</button>
                </div>
                <span>$400</span>
                <p>- Ticket para niños</p>
              </TicketBox>
              <TicketBox>
                <div>
                  <button onClick={() => handleChange(7, "rest")}>-</button>
                  <p>{tickets.find((el) => el.id === 7).quantity}</p>
                  <button onClick={() => handleChange(7, "sum")}>+</button>
                </div>
                <span>$800</span>
                <p>- Entradas para mayores de 13 años</p>
              </TicketBox>
              <TicketBox>
                <div>
                  <button onClick={() => handleChange(9, "rest")}>-</button>
                  <p>{tickets.find((el) => el.id === 9).quantity}</p>
                  <button onClick={() => handleChange(9, "sum")}>+</button>
                </div>
                <span>$400</span>
                <p>
                  - Entradas para personas mayores de 65 años o con discapacidad
                </p>
              </TicketBox>
            </Tickets>
            <Discount>
              <Coupon>
                <h3>discount coupon</h3>
                <input type="text" placeholder="enter your coupon code here" />
              </Coupon>
              <ApplyButton>
                <button>Apply</button>
              </ApplyButton>
            </Discount>
          </SelectTicket>
          <div>
            <ShoppingPoster />
            <ShoppingTotal handleTickets={handleTickets} />
          </div>
        </TicketContent>
      </Content>
      <Footer />
    </Container>
  );
};

export default SelectTickets;
