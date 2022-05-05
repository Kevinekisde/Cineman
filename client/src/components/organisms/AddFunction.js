import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AddFunctionDrop,
  AddFunctionForm,
  Container,
} from "./AddFunctionStyles";
import { getMovies, getRooms, addFunction } from "../../redux/actions";
import { validate } from "../utils/ValidateAddFunction";
import { Select } from "../pages/HomeStyles";
import { Button } from "../pages/DetailStyles";

const AddFunction = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    movie: "",
    sala: "",
    time: "",
    date: "",
  });
  const [show, setShow] = useState(true);
  const [errors, setErrors] = useState();

  const movies = useSelector((state) => state.allmovies);
  const rooms = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(getRooms());
    dispatch(getMovies());
  }, [dispatch]);

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const drawerFunction = () => {
    setShow(show !== true);
  };

  const handleFunctionInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errors.movie && !errors.sala && !errors.time && !errors.functionDate)
      dispatch(addFunction(input));

    setInput({ movie: "movie", sala: "room", time: "", date: "" });

    alert("Funcion agregada");
  };

  const functionSubmitButton = () => {
    if (
      !errors?.movie &&
      !errors?.sala &&
      !errors?.time &&
      !errors?.functionDate
    )
      return <Button onClick={handleSubmit}>Submit</Button>;
    return "";
  };
  return (
    <Container>
      <AddFunctionDrop>
        <h2>Add Function</h2>
        <div></div>
        <button onClick={drawerFunction}>
          <img src="/images/DownArrow.png" alt="" />
        </button>
      </AddFunctionDrop>
      {show ? (
        <div></div>
      ) : (
        <AddFunctionForm>
          <label id="movie" htmlFor="movie">
            Movie:
            <Select>
              <select
                style={{ width: "100%" }}
                onChange={handleFunctionInput}
                defaultValue={"movie"}
                name="movie"
              >
                <option value="movie" disabled>
                  Select movies
                </option>
                {movies?.map((movie) => (
                  <option value={movies.name} key={movie.name} name="movie">
                    {movie.name}
                  </option>
                ))}
              </select>
            </Select>
            {errors?.movie && <p>{errors.movie}</p>}
          </label>

          <label id="room" htmlFor="sala">
            Room:
            <Select>
              <select
                style={{ width: "100%" }}
                onChange={handleFunctionInput}
                defaultValue={"room"}
                name="sala"
              >
                <option value="room" disabled>
                  Select rooms
                </option>
                {rooms?.map((room) => (
                  <option value={room.name} key={room.name} name="sala">
                    {room.name}
                  </option>
                ))}
              </select>
            </Select>
            {errors?.sala && <p>{errors.sala}</p>}
          </label>

          <label id="date" htmlFor="time">
            Time:
            <input
              id="time"
              type="text"
              name="time"
              onChange={handleFunctionInput}
              value={input.time}
              placeholder="hh:mm"
            />
            {errors?.time && <p>{errors.time}</p>}
          </label>

          <label id="time" htmlFor="date">
            Date:
            <input
              id="date"
              type="text"
              name="date"
              onChange={handleFunctionInput}
              value={input.date}
              placeholder="yyyy-mm-dd"
            />
            {errors?.functionDate && <p>{errors.functionDate}</p>}
          </label>
        </AddFunctionForm>
      )}
      <div>{functionSubmitButton()}</div>
    </Container>
  );
};

export default AddFunction;
