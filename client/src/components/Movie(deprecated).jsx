import { Link } from "react-router-dom";
import s from "../components/Styles/Movie.module.css";

export default function Movie({ name, image, category, functions, id }) {
  return (
    <div className={s.card}>
      <Link to={"/peliculas/" + id}>
        <img src={image} className={s.img} alt="movie" />
      </Link>
      <h3>{name}</h3>
    </div>
  );
}
