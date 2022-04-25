import styled from "styled-components";

export const NavComponent = styled.div`
  display: flex;
  align-items: center;
  height: 200px;
  width: 100%;
  max-width: 1620px;

  span {
    width: max-content;
    min-width: max-content;
    padding: 14px 28px;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-sizing: border-box;
    border-radius: 100px;
  }

  div {
    border-bottom: 1px solid rgba(255, 255, 255, 0.25);
    width: 100px;
  }
`;
