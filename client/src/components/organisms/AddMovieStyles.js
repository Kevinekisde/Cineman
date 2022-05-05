import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 1620px;
  padding-top: 80px;
`;

export const AddMovieDrop = styled.div`
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

export const AddMovieForm = styled.form`
  display: grid;
  grid-template-areas:
    "name image image"
    "date site site"
    "genres poster poster"
    "duration trailer trailer"
    "dubbed category soon"
    "sinopsis sinopsis rating";
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

  #name {
    grid-area: name;
  }

  #image {
    grid-area: image;
  }

  #date {
    grid-area: date;
  }

  #official-site {
    grid-area: site;
  }

  #genres {
    grid-area: genres;
  }

  #poster {
    grid-area: poster;
  }

  #duration {
    grid-area: duration;
  }

  #trailer {
    grid-area: trailer;
  }

  #dubbed {
    grid-area: dubbed;
  }

  #category {
    grid-area: category;
  }

  #soon {
    grid-area: soon;
  }

  #sinopsis {
    grid-area: sinopsis;
  }

  #rating {
    grid-area: rating;
  }
`;
