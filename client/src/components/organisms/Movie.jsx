import React, { useState } from "react";
import { Card } from "../pages/HomeStyles";
import { useNavigate } from "react-router-dom";

const Movie = ({
  name,
  background,
  id,
  backgroundPoster,
  isLength,
  scroll,
  stop,
  category,
  rating,
  intervalo,
  derecha,
}) => {


  const [style, setStyle] = useState({ backgroundImage: `url(${background})` });

  const chanche = () => {
    setStyle({ backgroundImage: `url(${backgroundPoster})` });
    if (isLength == "c") {
      scroll();
    }
  };

  const chancheLeft = () => {
    setStyle({ backgroundImage: `url(${background})` });
    if (isLength == "c") {
      stop();
    }
  };

  const selectStyle = (el) => {
    if (el == "Terror") return { backgroundColor: "#605F5E" };
    if (el == "Acción") return { backgroundColor: "#DA2C38" };
    if (el == "Aventura") return { backgroundColor: "#083D77" };
    if (el == "Fantasía") return { backgroundColor: "#5618c3" };
    if (el == "Ciencia ficción") return { backgroundColor: "#226F54" };
    if (el == "Drama Musical") return { backgroundColor: "#C42847" };
    if (el == "Comedia") return { backgroundColor: "#d62373" };
    if (el == "Documental") return { backgroundColor: "orange" };
    if (el == "Suspenso") return { backgroundColor: "#3C3C3C" };
  };

  const navigate = useNavigate();

  return (
    <Card
      id="movie"
      onClick={() => navigate("/detail/" + id)}
      style={style}
      onMouseOver={() => chanche()}
      onMouseLeave={() => chancheLeft()}
    >
      <div id="box">
        <div id="blackbox">
          <h3>{name}</h3>
          <div>{rating}</div>
          <div id="genre">
            {
              category.map((category) => (
                <h2 style={selectStyle(category)}>{category}</h2>
              ))
            }
          </div>
        </div>

      </div>
    </Card>
  );
};

export default Movie;
