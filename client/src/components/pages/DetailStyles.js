import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 99.99vh;
`;

export const Content = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 266px);
`;

export const DetailContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1620px;
  height: 350px;
`;

export const MovieBox = styled.div`
--animate-duration: 0.8s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 540px;
  height: 100%;

  &:last-child {
    align-items: flex-end;
  }

  img {
    width: fit-content;
    border-radius: 10px;
    animation: ilustrationAnimate ease-in 1s infinite alternate;
    
  }

  @keyframes ilustrationAnimate{
    0%{
        transform: scale(1);
    }100%{
        transform: scale(1.04);
    }
  }
`;

export const MovieInfo = styled.div`
  font-style: normal;
  letter-spacing: 0.1em;
  color: #ffffff;

  h2 {
    font-weight: 700;
    font-size: 40px;
    line-height: 50px;
    text-transform: uppercase;
    margin-bottom: 15px;
  }

  p {
    margin-bottom: 50px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }

  #category{
    display: flex;
    gap:8px;
    margin-bottom:10px;
  }

  h3{
    display: flex;
    justify-content: center;
    align-items:center;
    width:100px;
    height:40px;
    text-align: center;
    border-radius:10px;
  }
`;

export const Button = styled.button`
  box-sizing: border-box;
  padding: 14px 28px;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.1em;
  background-color: transparent;
  border: 1px solid #ffffff;
  border-radius: 100px;
  color: #ffffff;
  cursor: pointer;

  &:first-child {
    margin-right: 40px;
  }

  a{
    text-decoration: none;
    color: white;
  }
`;

export const MovieTrailer = styled.div`
  img {
    box-sizing: border-box;
    padding: 38px 65px;
    color: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 100px;
    cursor: pointer;
  }

  p {
    text-align: center;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.1em;
    color: #ffffff;
  }
`;
