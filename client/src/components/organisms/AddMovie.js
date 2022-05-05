import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { validate } from "../utils/ValidateAddMovie";
import { addMovie } from "../../redux/actions";
import { AddMovieDrop, AddMovieForm, Container } from "./AddMovieStyles";
import { Select } from "../pages/HomeStyles";
import { Button } from "../pages/DetailStyles";

const AddMovie = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    sinopsis: "",
    image: "",
    poster: "",
    trailer: "",
    officialSite: "",
    date: "",
    rating: "",
    duration: "",
    genres: [],
    cat: "G",
    dub: false,
    commingsoon: false,
  });
  const categories = ["G", "PG", "PG-13", "R", "NC-17"];
  const [genreInput, setGenreInput] = useState("");
  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});
  const [show, setShow] = useState(true);

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  useEffect(() => {
    setInput({ ...input, genres: genres });
  }, [genres]);

  const handleMovieInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !errors.name &&
      !errors.sinopsis &&
      !errors.poster &&
      !errors.trailer &&
      !errors.officialSite &&
      !errors.image &&
      !errors.date &&
      !errors.rating &&
      !errors.genres &&
      !errors.functions &&
      !errors.duration
    )
      dispatch(addMovie(input));

    setInput({
      name: "",
      sinopsis: "",
      image: "",
      poster: "",
      trailer: "",
      officialSite: "",
      date: "",
      rating: "",
      duration: "",
      genres: [],
      cat: "G",
      dub: false,
      commingsoon: false,
    });
    setGenres([]);
    alert("Pelicula agregada");
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
    if (
      !errors.name &&
      !errors.sinopsis &&
      !errors.poster &&
      !errors.trailer &&
      !errors.officialSite &&
      !errors.image &&
      !errors.date &&
      !errors.rating &&
      !errors.genres &&
      !errors.functions &&
      !errors.duration
    )
      return <Button onClick={handleSubmit}>Submit</Button>;
    return "";
  };
  const drawerFunction = () => {
    setShow(show !== true);
  };

  return (
    <Container>
      <AddMovieDrop>
        <h2>Add Movie</h2>
        <div></div>
        <button onClick={drawerFunction}>
          <img src="/images/DownArrow.png" alt="" />
        </button>
      </AddMovieDrop>
      {show ? (
        <div></div>
      ) : (
        <AddMovieForm>
          <label id="name" htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              onChange={handleMovieInput}
              value={input.name}
            />
            {errors?.name && <p>{errors.name}</p>}
          </label>

          <label id="image" htmlFor="image">
            Image:
            <input
              type="text"
              name="image"
              onChange={handleMovieInput}
              value={input.image}
              placeholder="Insert image url"
            />
            {errors?.image && <p>{errors.image}</p>}
          </label>

          <label id="date" htmlFor="date">
            Date:
            <input
              type="text"
              name="date"
              onChange={handleMovieInput}
              value={input.date}
              placeholder="yyyy-mm-dd"
            />
            {errors?.date && <p>{errors.date}</p>}
          </label>

          <label id="officialSite" htmlFor="officialSite">
            Official Site:
            <input
              type="text"
              name="officialSite"
              onChange={handleMovieInput}
              value={input.officialSite}
              placeholder="Insert official site url"
            />
            {errors?.officialSite && <p>{errors.officialSite}</p>}
          </label>

          <label id="genres" htmlFor="genre">
            Genres:
            <input
              type="text"
              name="genre"
              onChange={handleGenres}
              value={genreInput}
            />
            <Button
              onClick={addGenre}
              style={{
                width: "fit-content",
                marginTop: "5px",
                padding: "10px",
              }}
            >
              add
            </Button>
            <div className="select_button_container" name={"genres"}>
              {genres?.map((genre) => (
                <Button
                  onClick={deleteGenre}
                  name={genre}
                  key={genre}
                  className="select_button"
                  style={{
                    width: "fit-content",
                    marginTop: "5px",
                    padding: "10px",
                  }}
                >
                  {genre}
                </Button>
              ))}
            </div>
            {errors?.genres && <p>{errors.genres}</p>}
          </label>

          <label id="poster" htmlFor="poster">
            Poster:
            <input
              type="text"
              name="poster"
              onChange={handleMovieInput}
              value={input.poster}
              placeholder="Insert poster url"
            />
            {errors?.poster && <p>{errors.poster}</p>}
          </label>

          <label id="duration" htmlFor="duration">
            Duration:
            <input
              type="text"
              name="duration"
              onChange={handleMovieInput}
              value={input.duration}
              placeholder="Duration in minutes"
            />
            {errors?.duration && <p>{errors.duration}</p>}
          </label>

          <label id="trailer" htmlFor="trailer">
            Trailer:
            <input
              type="text"
              name="trailer"
              onChange={handleMovieInput}
              value={input.trailer}
              placeholder="Insert trailer url"
            />
            {errors?.trailer && <p>{errors.trailer}</p>}
          </label>

          <label id="sinopsis" htmlFor="sinopsis">
            Sinopsis:
            <input
              type="text"
              name="sinopsis"
              onChange={handleMovieInput}
              value={input.sinopsis}
            />
            {errors?.sinopsis && <p>{errors.sinopsis}</p>}
          </label>

          <label id="rating" htmlFor="rating">
            Rating:
            <input
              type="text"
              name="rating"
              onChange={handleMovieInput}
              value={input.rating}
              placeholder="rate from 0 to 5"
            />
            {errors?.rating && <p>{errors.rating}</p>}
          </label>

          <label id="soon" htmlFor="comingsoon">
            Coming soon:
            <Select>
              <select
                style={{ width: "100%" }}
                onChange={handleMovieInput}
                defaultValue={"comingsoon"}
                name="comingsoon"
              >
                <option value="comingsoon" disabled hidden>
                  Yes/No
                </option>
                <option value={true} name="comingsoon">
                  {" "}
                  Yes
                </option>
                <option value={false} name="comingsoon">
                  {" "}
                  No
                </option>
              </select>
            </Select>
          </label>

          <label id="dubbed" htmlFor="dub">
            is it Dubbed?:
            <Select>
              <select
                style={{ width: "100%" }}
                onChange={handleMovieInput}
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
            </Select>
          </label>

          <label id="category" htmlFor="cat">
            Category (Age)
            <Select>
              <select
                style={{ width: "100%" }}
                onChange={handleMovieInput}
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
            </Select>
            {errors?.cat && <p>{errors.cat}</p>}
          </label>
        </AddMovieForm>
      )}
      <div>{movieSubmitButton()}</div>
    </Container>
  );
};

export default AddMovie;
