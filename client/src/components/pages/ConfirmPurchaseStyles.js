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

export const ConfirmContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1620px;
`;

export const ConfirmInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 40px;
  padding: 40px;
  color: #ffffff;
  background: #0c0c0c;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

export const Input = styled.div`
  h2 {
    padding-bottom: 20px;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
    border-bottom: 1px solid #ffffff;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding-top: 70px;
  color: #ffffff;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    input {
      margin-top: 35px;
      width: 50%;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #ffffff;
      color: #ffffff;
      font-size: 20px;

      &:focus-visible {
        outline: none;
      }
    }
  }
`;
export const Methods = styled.div`
  img:first-child {
    margin-right: 100px;
  }
`;
