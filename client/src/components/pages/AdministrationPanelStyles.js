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
`;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;
