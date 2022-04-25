import React from "react";
import { Container, MovieDetail } from "./ShoppingPosterStyles";

const ShoppingPoster = () => {
  return (
    <Container>
      <img src="/images/MoviePoster.png" alt="" />
      <MovieDetail>
        <h2>Elden Ring</h2>
        <h3>Cineman - sala 1</h3>
        <p>martes pa, 3 de marzo de 1992.</p>
        <p>19:00 hs.</p>
      </MovieDetail>
    </Container>
  );
};

export default ShoppingPoster;
