import styled from "styled-components";
import { Link } from "react-router-dom";

export const LandingContent = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url("/images/BackgroundHome.png");
  align-items: center;
  background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.85) 17.47%,
      rgba(30, 30, 30, 0.4) 100%
    ),
    url("images/BackgroundHome.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const LandingButtons = styled.div`
  align-self: flex-end;
  margin-right: 2vw;
  margin-top: 2vh;

  button {
    margin: 2.5px;
    background: none;
    border: none;
    width: 6vw;
    height: 5vh;
    border-radius: 5px;
    transition: 0.5s ease all;

    &:hover {
      background-color: black;
      color: white;
      cursor: pointer;
    }
  }
`;

export const ButtonHome = styled.div`
  margin: auto auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    cursor: default;
    margin: 0;
    font-weight: 700;
    font-size: 75px;
    line-height: 66px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
    user-select: none;
    margin-bottom: 35px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 50px;
  margin: 0;

  button {
    box-sizing: border-box;
    transition: 0.5s ease all;
    padding: 14px 40px;
    font-weight: 700;
    font-size: 30px;
    letter-spacing: 0.1em;
    background-color: transparent;
    border: 1px solid #ffffff;
    border-radius: 100px;
    color: #ffffff;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
      background-color: #ffffff;
      color: #000000;
      border: 2px white solid;
    }
  }
`;
