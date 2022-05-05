import styled from "styled-components";

export const Container = styled.div`
  padding-top: 80px;
  width: 100%;
  max-width: 1620px;
`;

export const AddFunctionDrop = styled.div`
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

export const AddFunctionForm = styled.form`
  display: grid;
  grid-template-areas:
    "movie movie time"
    "room room date";
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  column-gap: 200px;
  row-gap: 50px;
  margin-bottom: 100px;
  color: #ffffff;

  label {
    display: flex;
    flex-direction: column;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    input {
      margin-top: 15px;
      font-size: 18px;
      color: #ffffff;
      background-color: transparent;
      border: none;
      border-bottom: 1px solid #ffffff;

      &:focus-visible {
        outline: none;
      }
    }
    p {
      font-size: 12px;
      color: red;
    }
  }

  #movie {
    grid-area: movie;
  }

  #time {
    grid-area: time;
  }

  #room {
    grid-area: room;
  }

  #date {
    grid-area: date;
  }
`;
