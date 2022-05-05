import styled from "styled-components";
import Image from "../../img/AdminBackground.png";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100vw;
  position: fixed;
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

export const Purchase = styled.div`
  display: flex;
  width: 100%;
  max-width: 1620px;
`;

export const PurchaseInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-right: 40px;
  padding: 40px;
  color: #ffffff;
  background: #0c0c0c;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  h2 {
    margin-bottom: 50px;
    font-weight: 700;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  button {
    box-sizing: border-box;
    height: min-content;
    padding: 14px 28px;
    margin-bottom: 30px;
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

  p {
    font-size: 16px;
    letter-spacing: 0.1em;
  }
`;
