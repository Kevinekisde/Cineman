import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { localStorageCart } from "../../redux/actions";

const Combo = ({ data, addToCart, deleteFromCart }) => {
  let { id, title, unit_price, image } = data;
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  let cart = useSelector((state) => state.cart);
  useEffect(() => {
    let cartlocalStor = JSON.parse(localStorage.getItem("cart"));
    if (cartlocalStor !== null || cartlocalStor?.length > 0) {
      dispatch(localStorageCart(cartlocalStor));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <Container>
      <InfoCombo>
        <h2> {title}</h2>
        <h5>{unit_price}</h5>
        <img src={image} width={250} height={200} alt="combo" />
      </InfoCombo>
      <AddCombo>
        <button
          onClick={() => {
            if (quantity > 0) setQuantity(quantity - 1);
            return deleteFromCart(id);
          }}
        >
          -
        </button>
        <p className="valor">{quantity}</p>
        <button
          onClick={() => {
            data.quantity = setQuantity(quantity + 1);
            return addToCart(id);
          }}
        >
          +
        </button>
      </AddCombo>
    </Container>
  );
};

export const Container = styled.div`
  width: 300px;
  height: 450px;
  padding: 40px;
  background: #0c0c0c;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  margin-bottom: 35px;
`;

export const InfoCombo = styled.div`
  h2 {
    margin-bottom: 40px;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
  }

  img {
    display: block;
    margin: 0 auto;
    margin-bottom: 45px;
    width: -webkit-fill-available;
  }
`;

export const AddCombo = styled.div`
  display: flex;
  justify-content: center;

  button,
  p {
    padding: 14px 28px;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.1em;
    color: #ffffff;
    border: 1px solid #ffffff;
    box-sizing: border-box;
    border-radius: 100px;
    margin: 0 20px;
  }

  button {
    background-color: transparent;
    border: none;
    margin: 0;
    cursor: pointer;
  }
`;

export default Combo;
