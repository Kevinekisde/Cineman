import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import Movie from "./Movie(deprecated).jsx";
import s from "../components/Styles/Movies.module.css";
import { getMovies } from "../redux/actions";

export default function Movies() {
  const dispatch = useDispatch();

  const allMovies = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <div className={s.movies}>
      {allMovies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          name={movie?.name}
          image={movie.image}
          category={movie.category}
          functions={movie.functions}
        />
      ))}
    </div>
  );
}
