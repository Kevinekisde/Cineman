import styled from "styled-components";

export const Container = styled.div`
  padding-top: 80px;
  width: 100%;
  max-width: 1620px;
`;

export const CreateRoomDrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 50px;
  color: #ffffff;

  h2 {
    width: max-content;
    font-weight: 500;
    font-size: 40px;
    line-height: 48px;
    letter-spacing: 0.1em;
  }

  div {
    width: 60%;
    margin: 0 50px;
    border-bottom: 2px solid #ffffff;
  }

  button {
    padding: 11px 28px;
    background-color: transparent;
    border: 1px solid #ffffff;
    border-radius: 100px;
    cursor: pointer;
    transition: 0.5s ease all;
  }
`;

export const Create = styled.div`
  display: flex;
  justify-content: center;
  background-color: #ffffff20;
  border-radius: 20px;
  width: min-content;
  margin: 0 auto;
  padding: 40px;
`;
