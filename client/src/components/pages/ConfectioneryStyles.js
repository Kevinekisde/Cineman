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

export const ConfectioneryContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1620px;
`;

export const SelectConfectionery = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 670px;
  margin-right: 40px;
  padding: 40px;
  color: #ffffff;
  background: #0c0c0c;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`;

export const NavFood = styled.nav`
  margin-bottom: 40px;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #ffffff;

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;

    li {
      padding: 0 20px;
      border-right: 1px solid #ffffff;
      text-transform: uppercase;
      cursor: pointer;

      &:last-child {
        border: none;
      }
    }
  }
`;

export const Catalog = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
`;
