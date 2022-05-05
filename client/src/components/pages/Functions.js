import React, { useEffect, useState } from "react";
import s from "./Functions.module.css";
import "animate.css/animate.min.css";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { getDetail, getRoom, setFunction } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Functions = ({ funciones }) => {
  //   console.log(funciones);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let functionDetails = useSelector((state) => state.functionDetail);
  const [funsion, setFunsion] = useState({});

  useEffect(() => {
    // console.log(funsion?.funcion?.movie);
    dispatch(getDetail(functionDetails.funcion?.movie));
    dispatch(getRoom(functionDetails.funcion?.sala));
    localStorage.setItem("sP", JSON.stringify(functionDetails));
  }, [dispatch, funsion, functionDetails]);

  const selectFunction = async (funcion) => {
    dispatch(setFunction(funcion));
    setFunsion(funcion);
    setTimeout(() => {
      navigate("/selecttickets");
    }, 1000);
  };
  // useEffect(() => {
  //   // console.log(funsion?.funcion?.movie);
  //   dispatch(getDetail(functionDetails.funcion?.movie));
  //   dispatch(getRoom(functionDetails.funcion?.sala));
  //   localStorage.setItem("sP", JSON.stringify(functionDetails));
  // }, [dispatch, funsion, functionDetails]);

  // const selectFunction = async (funcion) => {
  //   dispatch(setFunction(funcion));
  //   setFunsion(funcion);
  //   setTimeout(() => {
  //     navigate("/selecttickets");
  //   }, 1000);
  // };

  return (
    <section id="Functions" className={s.container}>
      <AnimationOnScroll animateIn="animate__fadeInUp">
        <div className={s.Functions}>
          <div className={s.title}>
            <div className={s.line}></div>
            <h1 className={s.text}>Horarios</h1>
            <div className={s.line}></div>
          </div>
          <div className={s.containerTime}>
            {funciones.map((funcion) => (
              <button
                className={s.time}
                onClick={() => selectFunction(funcion)}
              >
                {funcion.time}
              </button>
            ))}
          </div>
        </div>
      </AnimationOnScroll>
    </section>
  );
};

export default Functions;
