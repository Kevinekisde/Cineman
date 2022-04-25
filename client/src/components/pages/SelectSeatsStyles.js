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
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-bottom: 80px;
`;

export const SeatsContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 1620px;
`;

export const SelectSeat = styled.div`
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
