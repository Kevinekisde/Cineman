import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 99.99vh;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.85) 17.47%,
      rgba(30, 30, 30, 0.4) 100%
    ),
    url("images/Error404.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const Content = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 266px);
`;

export const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 0.1em;
  color: #ffffff;

  img {
    padding-bottom: 20px;
  }

  p,
  h3 {
    padding-bottom: 30px;
    font-size: 25px;
  }

  h2 {
    padding-bottom: 30px;
    font-weight: 700;
    font-size: 45px;
    line-height: 54px;
    text-transform: uppercase;
  }
`;

export const Button = styled.button`
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
`;
