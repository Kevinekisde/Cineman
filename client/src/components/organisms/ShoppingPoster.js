import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDetail, getRoom, localStorageFunction } from "../../redux/actions";
import { Container, MovieDetail } from "./ShoppingPosterStyles";

const ShoppingPoster = () => {
  const dispatch = useDispatch();
  const functionDetails = useSelector((state) => state.functionDetail);
  const selectedTickets = useSelector((state) => state.selectedTickets);
  const navigate = useNavigate();
  //guardar el ID de la función y hacer setFunction(id)

  // localStorage.setItem("sP", JSON.stringify(functionDetails));
  // console.log(functionDetails);

  ///////////////////////REDIRECTION HANDLERS///////////////////////

  functionDetails?.length == 0 ||
    (functionDetails == null &&
      window.location.pathname == "/selecttickets" &&
      window.location.replace("/home"));
  functionDetails?.length == 0 ||
    (functionDetails == null &&
      window.location.pathname == "/confectionery" &&
      window.location.replace("/home"));
  functionDetails?.length == 0 ||
    (functionDetails == null &&
      window.location.pathname == "/selectseat" &&
      window.location.replace("/home"));
  functionDetails?.length == 0 ||
    (functionDetails == null &&
      window.location.pathname == "/confirmpurchase" &&
      window.location.replace("/home"));

  ///////////////////////REDIRECTION HANDLERS///////////////////////
  var poster = JSON.parse(localStorage.getItem("sP"));
  // console.log(poster);
  useEffect(() => {
    // dispatch(getDetail(functionDetails.funcion?.movie));
    // dispatch(getRoom(functionDetails.funcion?.sala));
    dispatch(localStorageFunction(poster));
  }, []);
  // useEffect(() => {

  // return () => {
  //   dispatch(clearFunction()); //this apparently works...
  // };
  return (
    <Container>
      <img src={`${functionDetails.movie?.poster}`} alt="" />
      <MovieDetail>
        <h2>{functionDetails.movie?.name}</h2>
        <h3>{functionDetails.room?.name}</h3>
        <p>{functionDetails.funcion?.date}</p>
        <p>{functionDetails.funcion?.time}</p>
      </MovieDetail>
    </Container>
  );
};

export default ShoppingPoster;
