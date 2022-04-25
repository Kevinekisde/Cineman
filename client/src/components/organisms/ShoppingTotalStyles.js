import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 480px;
  height: 350px;
  padding: 40px;
  background: #0c0c0c;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

export const TotalInfo = styled.div`
  color: #ffffff;

  h2 {
    margin-bottom: 20px;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  p {
    padding-top: 10px;
    text-align: end;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.1em;
  }

  button {
    cursor: pointer;
    color: white;
    border: none;
    background: #0c0c0c;
  }
`;

export const Details = styled.div`
  display: flex;
  ${"" /* ${"" /* flex-direction: column; */} */}
  justify-content: space-between;
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
  color: #ffffff;

  span {
    padding-top: 10px;
    margin-bottom: 30px;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.1em;
  }
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    box-sizing: border-box;
    padding: 14px 28px;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.1em;
    background-color: transparent;
    border: 1px solid #ffffff;
    border-radius: 100px;
    color: #ffffff;
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none;
    transition: 0.5s ease all;
  }
  a {
    box-sizing: border-box;
    padding: 14px 28px;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.1em;
    background-color: transparent;
    border: 1px solid #ffffff;
    border-radius: 100px;
    color: #ffffff;
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none;
    transition: 0.5s ease all;

    &:hover {
      background: #ffffff;
      color: #0c0c0c;
    }
  }
`;
