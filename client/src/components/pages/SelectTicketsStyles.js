import styled from "styled-components";
import Image from "../../img/AdminBackground.png";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-image: url(${Image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const Content = styled.main`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-bottom: 80px;
`;

export const TicketContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1620px;
`;

export const SelectTicket = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 40px;
  padding: 40px;
  color: #ffffff;
  background: #0c0c0c;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding-bottom: 20px;
    border-bottom: 1px solid #ffffff;
  }
`;

export const Tickets = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: max-content;
  margin: auto;
`;

export const TicketBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 30px 0;
  color: #ffffff;
  border-bottom: 1px solid #ffffff;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
    border: none;
  }

  div {
    display: flex;
    gap: 20px;
    margin-right: 50px;

    button:hover {
      &:hover {
        color: #0c0c0c;
        background: #ffffff;
        cursor: pointer;
      }
    }

    button,
    p {
      padding: 3.5px 33px;
      font-weight: 700;
      font-size: 36px;
      line-height: 43px;
      letter-spacing: 0.1em;
      color: #ffffff;
      border: 1px solid #ffffff;
      box-sizing: border-box;
      border-radius: 15px;
      background-color: transparent;
    }
  }

  span {
    margin-right: 50px;
    font-weight: 400;
    font-size: 36px;
    line-height: 43px;
    letter-spacing: 0.1em;
  }

  p {
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.1em;
  }
`;

export const Discount = styled.div`
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  color: #ffffff;
`;

export const Coupon = styled.div`
  width: 100%;

  h3 {
    margin-bottom: 30px;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.1em;
  }

  input {
    width: 100%;
    padding-bottom: 10px;
    font-size: 20px;
    color: #ffffff;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #ffffff;

    &::placeholder {
      font-weight: 300;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.1em;
      color: #ffffff;
    }

    &:focus-visible {
      outline: none;
    }
  }
`;

export const ApplyButton = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: 100px;

  button {
    box-sizing: border-box;
    height: min-content;
    padding: 14px 28px;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    color: #ffffff;
    background-color: transparent;
    border: 1px solid #ffffff;
    border-radius: 100px;
    cursor: pointer;
    transition: 0.5s ease all;

    &:hover {
      color: #0c0c0c;
      background: #ffffff;
    }
  }
`;
