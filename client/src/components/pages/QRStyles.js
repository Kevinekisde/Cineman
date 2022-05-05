import styled from "styled-components";
import Image from "../../img/Home__background.png";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
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
  width: 100%;
  height: 100%;
`;

export const QRContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1620px;
  color: #ffffff;
`;

export const QRCard = styled.div`
  display: flex;
  background-color: #0c0c0c;
  border-radius: 20px;
  width: max-content;
  padding: 40px;
`;

export const QRImage = styled.div`
  display: flex;
  align-items: center;
  width: 350px;
  background-color: #ffffff25;
  border-radius: 20px;
  margin-right: 40px;
`;

export const QRInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 350px;
`;

export const Title = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ffffff;
  h2 {
    text-transform: uppercase;
    font-size: 28px;
    margin-bottom: 10px;
    letter-spacing: 0.1em;
  }
`;

export const Tickets = styled.div`
  width: 100%;
  padding-top: 20px;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ffffff;
  h3 {
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding-bottom: 10px;
  }
  div {
    display: flex;
    justify-content: space-between;
    p {
      padding-bottom: 5px;
    }
  }
`;

export const Products = styled.div`
  width: 100%;
  padding-top: 20px;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ffffff;
  h3 {
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding-bottom: 10px;
  }
  div {
    display: flex;
    justify-content: space-between;
    p {
      padding-bottom: 5px;
    }
  }
`;

export const Total = styled.div`
  padding-top: 20px;
  text-align: center;
  p {
    text-transform: uppercase;
    margin-bottom: 10px;
    font-size: 34px;
    font-weight: 700;
    letter-spacing: 0.1em;
  }
`;
