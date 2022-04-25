import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Nav";
import "./Styles/Admin.css";
import { validate } from "./utils/FormValidate.js";
import Butacas from "./ButacasAdmin";
import { addMovie, addFunction, getMovies, getRooms } from "../redux/actions";

export default function Admin() {
  const dispatch = useDispatch();
  const categories = ["G", "PG", "PG-13", "R", "NC-17"];
  const movies = useSelector((state) => state.allmovies);
  const rooms = useSelector((state) => state.rooms);
  const [errors, setErrors] = useState();
  const [genres, setGenres] = useState([]);
  const [genreInput, setGenreInput] = useState("");
  const [input, setInput] = useState([
    {
      name: "",
      sinopsis: "",
      image: "",
      date: "",
      rating: "",
      duration: "",
      genres: [],
      cat: "G",
      dub: false,
    }, //input de Movie
    { movie: "", sala: "", time: "", date: "" }, //input de Function
  ]);

  useEffect(() => {
    dispatch(getRooms());
    dispatch(getMovies());
  }, [dispatch]);

  useEffect(() => {
    setInput([
      { ...input[0], genres: genres }, //tuve que hacer este aquí porque no se actualizaba a tiempo(tenía retraso y dependía de otro input)
      { ...input[1] },
    ]);
  }, [genres]);

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const handleMovieInput = (e) => {
    setInput([
      { ...input[0], [e.target.name]: e.target.value },
      { ...input[1] },
    ]);
  };

  const handleFunctionInput = (e) => {
    setInput([
      { ...input[0] },
      { ...input[1], [e.target.name]: e.target.value },
    ]);
  };
  const handleSalaInput = (e) => {
    setInput([
      { ...input[0] },
      { ...input[1], [e.target.name]: e.target.value },
    ]);
  };

  const handleSubmit = (ok) => {
    ok.preventDefault();

    if (
      !errors.name &&
      !errors.sinopsis &&
      !errors.image &&
      !errors.date &&
      !errors.rating &&
      !errors.genres &&
      !errors.functions &&
      !errors.duration
    )
      dispatch(addMovie(input));
    if (!errors.movie && !errors.sala && !errors.time && !errors.functionDate)
      dispatch(addFunction(input));

    setInput([
      {
        name: "",
        sinopsis: "",
        image: "",
        date: "",
        rating: "",
        duration: "",
        genres: [],
        cat: "G",
        dub: false,
      },
      { movie: "", sala: "", time: "", date: "" },
    ]);
    setGenres([]);
    alert("something happened");
  };

  const handleGenres = (e) => {
    setGenreInput(e.target.value);
  };

  const addGenre = (e) => {
    e.preventDefault();
    if (
      !genres.includes(genreInput) &&
      genreInput &&
      genreInput.indexOf(" ") !== 0
    )
      setGenres([...genres, genreInput]);
    setGenreInput("");
  };

  const deleteGenre = (e) => {
    e.preventDefault();
    setGenres(genres.filter((gen) => gen !== e.target.name));
  };

  const movieSubmitButton = () => {
    //prettier-ignore
    if (  !errors.name && !errors.sinopsis && !errors.image && !errors.date && !errors.rating && !errors.genres && !errors.functions && !errors.duration)
      return (
        <button onClick={handleSubmit} className="form_button">
          Submit
        </button>
      );
    return "";
  };

  const functionSubmitButton = () => {
    //sustituir
    //prettier-ignore
    if (!errors.movie && !errors.sala && !errors.time && !errors.functionDate )
      return (
        <button onClick={handleSubmit} className="form_button">
          Submit
        </button>
      );
    return "";
  };

  //toggle menu--------------

  const [showMovie, setShowMovie] = useState(true);
  const drawerFunction1 = () => {
    setShowMovie(showMovie !== true);
  };
  const [showFunction, setShowFunction] = useState(true);
  const drawerFunction2 = () => {
    setShowFunction(showFunction !== true);
  };
  const [showRoom, setShowRoom] = useState(true);
  const drawerFunction3 = () => {
    setShowRoom(showRoom !== true);
  };

  return (
    <div>
      <Navbar />
      <h1 className="admin_title">Admin Pannel</h1>
      <div className="main_container">
        <button className="menu_button" onClick={drawerFunction1}>
          Add Movie
        </button>

        <div className="form_container">
          {showMovie ? (
            <div></div>
          ) : (
            <form>
              <div className="input_container">
                <label className="form_label" htmlFor="name">
                  Name:
                </label>
                <input
                  id="name"
                  className={"form_input"}
                  type="text"
                  name="name"
                  onChange={handleMovieInput}
                  value={input[0].name}
                />
                {errors.name && <p className="danger">{errors.name}</p>}

                <label className="form_label" htmlFor="sinopsis">
                  Sinopsis:
                </label>
                <input
                  id="sinopsis"
                  className={"form_input"}
                  type="text"
                  name="sinopsis"
                  onChange={handleMovieInput}
                  value={input[0].sinopsis}
                />
                {errors.sinopsis && <p className="danger">{errors.sinopsis}</p>}

                <label className="form_label" htmlFor="image">
                  Image:
                </label>
                <input
                  id="image"
                  className={"form_input"}
                  type="text"
                  name="image"
                  onChange={handleMovieInput}
                  value={input[0].image}
                  placeholder="image url"
                />
                {errors.image && <p className="danger">{errors.image}</p>}

                <label className="form_label" htmlFor="date">
                  Date:
                </label>
                <input
                  id="date"
                  className={"form_input"}
                  type="text"
                  name="date"
                  onChange={handleMovieInput}
                  value={input[0].date}
                  placeholder="yyyy-mm-dd"
                />
                {errors.date && <p className="danger">{errors.date}</p>}

                <label className="form_label" htmlFor="rating">
                  Rating:
                </label>
                <input
                  id="rating"
                  className={"form_input"}
                  type="text"
                  name="rating"
                  onChange={handleMovieInput}
                  value={input[0].rating}
                  placeholder="rate from 0 to 5"
                />
                {errors.rating && <p className="danger">{errors.rating}</p>}

                <label className="form_label" htmlFor="duration">
                  Duration:
                </label>
                <input
                  id="duration"
                  className={"form_input"}
                  type="text"
                  name="duration"
                  onChange={handleMovieInput}
                  value={input[0].duration}
                  placeholder="duration in minutes"
                />
                {errors.duration && <p className="danger">{errors.duration}</p>}

                <label className="form_label" htmlFor="genre">
                  Genres:
                </label>
                <input
                  id="genre"
                  className={"form_input"}
                  type="text"
                  name="genre"
                  onChange={handleGenres}
                  value={genreInput}
                />
                <button onClick={addGenre}>add</button>
                <div className="select_button_container" name={"genres"}>
                  {genres?.map((genre) => (
                    <button
                      onClick={deleteGenre}
                      name={genre}
                      key={genre}
                      className="select_button"
                    >
                      {genre}
                    </button>
                  ))}
                </div>
                {errors.genres && <p className="danger">{errors.genres}</p>}

                <label className="form_label" htmlFor="cat">
                  Category:
                </label>
                <select
                  onChange={handleMovieInput}
                  className="select_form"
                  defaultValue={"cat"}
                  name="cat"
                >
                  <option value="cat" disabled hidden>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option value={cat} key={cat} name="cat">
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.cat && <p className="danger">{errors.cat}</p>}

                <label className="form_label" htmlFor="dub">
                  is it Dubbed?:
                </label>
                <select
                  onChange={handleMovieInput}
                  className="select_form"
                  defaultValue={"dub"}
                  name="dub"
                >
                  <option value="dub" disabled hidden>
                    Yes/No
                  </option>
                  <option value={true} name="dub">
                    {" "}
                    Yes
                  </option>
                  <option value={false} name="dub">
                    {" "}
                    No
                  </option>
                </select>
              </div>
              <div>{movieSubmitButton()}</div>
            </form>
          )}
        </div>

        <button className="menu_button" onClick={drawerFunction2}>
          Add Function
        </button>

        <div className="form_container">
          {showFunction ? (
            <div></div>
          ) : (
            <form>
              <div className="input_container">
                <label className="form_label" htmlFor="movie">
                  Movie:
                </label>
                <select
                  onChange={handleFunctionInput}
                  className="select_form"
                  defaultValue={"movie"}
                  name="movie"
                >
                  <option value="movie" disabled hidden>
                    Select movies
                  </option>
                  {movies?.map((movie) => (
                    <option value={movies.name} key={movie.name} name="movie">
                      {movie.name}
                    </option>
                  ))}
                </select>
                {errors.movie && <p className="danger">{errors.movie}</p>}

                <label className="form_label" htmlFor="sala">
                  Room:
                </label>
                <select
                  onChange={handleSalaInput}
                  className="select_form"
                  defaultValue={"sala"}
                  name="sala"
                >
                  <option value="room" disabled hidden>
                    Select rooms
                  </option>
                  {rooms?.map((room) => (
                    <option value={room.name} key={room.name} name="sala">
                      {room.name}
                    </option>
                  ))}
                </select>
                {errors.sala && <p className="danger">{errors.sala}</p>}

                <label className="form_label" htmlFor="time">
                  Time:
                </label>
                <input
                  id="time"
                  className={"form_input"}
                  type="text"
                  name="time"
                  onChange={handleFunctionInput}
                  value={input[1].time}
                  placeholder="hh:mm"
                />
                {errors.time && <p className="danger">{errors.time}</p>}

                <label className="form_label" htmlFor="date">                  
                  Date:
                </label>
                <input
                  id="date"
                  className={"form_input"}
                  type="text"
                  name="date"
                  onChange={handleFunctionInput}
                  value={input[1].date}
                  placeholder="yyyy-mm-dd"
                />
                {errors.functionDate && (
                  <p className="danger">{errors.functionDate}</p>
                )}
              </div>
              <div>{functionSubmitButton()}</div>
            </form>
          )}
        </div>

        <div>
          <button className="menu_button" onClick={drawerFunction3}>
            Create Room
          </button>
          {showRoom ? (
            <div></div>
          ) : (
            <div className="admin_butacas">          
              <Butacas />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
