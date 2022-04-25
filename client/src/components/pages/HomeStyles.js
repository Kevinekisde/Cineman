import styled from "styled-components";
import Image from "../../img/Home__background.png";

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
  height: 100%;
  width: 100%;
`;

export const Board = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
`;
export const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1620px;
  padding-bottom: 20px;
  color: white;

  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 48px;
    letter-spacing: 0.1em;
  }

  div {
    width: 75%;
    height: 1px;
    background-color: white;
  }
`;

export const Select = styled.span`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  &::after {
    position: absolute;
    right: 20px;
    content: "";
    width: 0.8em;
    height: 0.5em;
    background-color: #ffffff;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }

  select {
    width: 150px;
    height: 40px;
    border-radius: 20px;
    appearance: none;
    padding: 0 30px;
    background-color: transparent;
    color: #ffffff;
    outline: none;
    border: 1px solid #ffffff;
    font-size: 16px;
    cursor: pointer;

    &::-ms-expand {
      display: none;
    }

    &:focus {
      color: #fff;
      background-color: #0c0c0c;
    }
  }
`;

export const Cards = styled.div`
  display: flex;
  width: 100%;
  height: 350px;
  overflow-x: scroll;
  overflow-y: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;
export const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  &:first-child {
    min-width: 550px;
    margin-left: 145px;
    background-image: url("/images/Billboard__principal.png");
    background-position: center;
  }

  &:last-child {
    margin-right: 230px;
  }

  min-width: 250px;
  height: 100%;
  margin-right: 23px;
  background-image: url("/images/Billboard__card.png");
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: all 0.3s;

  h3 {
    display: block;
    color: white;
  }

  &:hover {
    transform: scale(1.01);
    min-width: 598px;
  }

  #box {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: flex-end;
    overflow: hidden;
  }

  #blackbox {
    display: none;
    color: white;
    padding: 10px;
    text-align: center;
    background-color: black;
    width: 30%;
    height: 100%;
    opacity: 0.8;
    animation: ilustrationAnimate ease-in 0.3s alternate;
  }
  @keyframes ilustrationAnimate {
    0% {
      transform: translateX(200px);
    }
    100% {
      transform: translateX(0px);
    }
  }
  #genre {
    margin-top: 30px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-size: 15px;
    width: 45%;
    border-radius: 5px;
  }

  &:hover #blackbox {
    display: block;
    transition-delay: 20s;
  }
`;

export const Scroll = styled.div`
  position: absolute;
  display: flex;
  top: 28vh;
  right: 0;
  height: 35%;
  min-width: 250px;
  z-index: 99;
`;

export const Scroll2 = styled.div`
  position: absolute;
  display: flex;
  top: 28vh;
  left: 0;
  height: 35%;
  min-width: 250px;
  z-index: 99;
`;
