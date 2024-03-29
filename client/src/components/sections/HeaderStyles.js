import styled from "styled-components";

export const Container = styled.header`
  display: flex;
  justify-content: center;
  min-height: min-content;
`;

export const Navbar = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1620px;
  height: 66px;
  margin-top: 80px;

  div {
    width: 60px;
    position: relative;

    &:first-child {
      width: 122.72px !important;
      cursor: default !important;
      color: transparent !important;
    }
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    z-index: 10;
  }

  #displaybutton {
    display: none;
    font-size: 25px;
    position: absolute;
    right: 55px;
    bottom: 500px;
    top: -40px;
    width: 200px;
    height: 140px;
    color: white;
    background-color: transparent;
    opacity: 1;
    border-radius: 20px;
    z-index: 1;
  }

  ul {
    padding: 20px;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    flex-direction: column;
  }
  li {
    display: flex;
    text-align: center;
  }

  #userpanel:hover #displaybutton {
    display: block;
    z-index: 99999999;
  }
`;

export const Button = styled.button`
  background-color: transparent;
  width: min-content;
  padding: 0 28px;
  height: 40px;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  border-radius: 100px;
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const Title = styled.h1`
  font-weight: 700;
  font-size: 55px;
  line-height: 66px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;
  cursor: pointer;
  user-select: none;
`;
