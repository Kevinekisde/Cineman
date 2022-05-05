import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import {
  Container,
  Content,
  QRCard,
  QRContent,
  QRImage,
  QRInfo,
  Title,
  Tickets,
  Products,
  Total,
} from "./QRStyles.js";

const QR = () => {
  const { order } = useParams();

  const [ticket, setTicket] = useState(null);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios(`http://localhost:3001/user/ticket/${order}`).then((r) => {
      setTicket(r.data);
      console.log(r.data);
    });
  }, []);

  useEffect(() => {
    let precios = ticket?.items?.map((i) => i.unit_price);
    setTotal(precios?.reduce((a, b) => Number(a) + Number(b)));
  }, [ticket, total]);

  return (
    <Container>
      <Header />
      <Content>
        <QRContent>
          <QRCard>
            <QRImage>
              <img
                style={{
                  width: "100%",
                  filter: "invert(100%)",
                  mixBlendMode: "difference",
                }}
                src={ticket?.qr}
                alt="Ticket QR"
              />
            </QRImage>
            <QRInfo>
              <Title>
                <h2>Elden Ring</h2>
                <p>Usted se tiene que arrepentir</p>
              </Title>
              <Tickets>
                <h3>Tickets</h3>
                {ticket?.items?.map(
                  (item) =>
                    item.title.toLowerCase().includes("ticket") && (
                      <div>
                        <p>{item.title}</p>
                        <span>${item.unit_price}</span>
                      </div>
                    )
                )}
              </Tickets>
              <Products>
                <h3>Products</h3>
                {ticket?.items?.map(
                  (item) =>
                    !item.title.toLowerCase().includes("ticket") && (
                      <div>
                        <p>{item.title}</p>
                        <span>${item.unit_price}</span>
                      </div>
                    )
                )}
              </Products>
              <Total>
                <p>Total</p>
                <h2>${total}</h2>
              </Total>
            </QRInfo>
          </QRCard>
        </QRContent>
      </Content>
      <Footer />
    </Container>
  );
};

export default QR;
