import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 480px;
  min-height: 280px;
  padding: 40px;
  margin-bottom: 40px;

  background: #0c0c0c;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  img {
    padding-right: 40px;
    height: 200px;
  }
`;
export const MovieDetail = styled.div`
  h2 {
    padding-bottom: 10px;
    letter-spacing: 0.1em;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    color: #ffffff;
    text-transform: uppercase;
    border-bottom: 1px solid #ffffff;
  }

  h3 {
    padding-top: 20px;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #ffffff;
  }

  p {
    padding-top: 10px;
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.1em;
    color: #ffffff;
  }
`;
