import { useEffect, useLayoutEffect, useState, useRef } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import s from "../components/Styles/MovieDetail.module.css";
import { getMoviesById, clearDetail } from "../redux/actions";
import Player from "./Player.jsx";

export default function MovieDetail() {
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMoviesById(id));
  }, []);

  useLayoutEffect(() => {
    return () => {
      dispatch(clearDetail);
    };
  }, [dispatch]);

  const myPeli = useSelector((state) => state.movieDetail);
  let arraycito = [];

  for (var i = 0; i < myPeli[0]?.rating.split("/")[0]; i++) {
    arraycito.push("⭐");
  }

  const [functions, setFunctions] = useState([]);

  const selectDate = (e) => {
    setFunctions([]);
    if (myPeli[0]?.functions.find((func) => func.date === e.target.value)) {
      setFunctions(
        myPeli[0].functions.filter((fun) => fun.date.includes(e.target.value))
      );
    }
  };

  // console.log(functions)

  const navigate = useNavigate();
  const selectFunction = () => {
    navigate("/selectroom");
    //setear en localstorage la funcion
  };
  console.log(myPeli[0]?.trailer);

  const [play, setPlay] = useState(false);

  return (
    <>
      <div className={s.root}>
        <Player url={myPeli[0]?.trailer} />
        {myPeli.length > 0 ? (
          <>
            <Link to="/home">
              <img
                src="https://freepngimg.com/save/163768-arrow-left-free-photo/512x512"
                width="120px"
                className={s.return}
                alt="fotitoparaatras"
              />
            </Link>
            <div className={s.detail}>
              <div className={s.title}>
                <img
                  height="700px"
                  width="500px"
                  src={myPeli[0].image}
                  alt=""
                />
              </div>
              <div className={s.down}>
                <h1>{myPeli[0]?.name}</h1>
                <h2>{myPeli[0]?.review}</h2>
                <h3>{arraycito}</h3>
                <h4>{myPeli[0]?.category?.map((cat) => cat + " ")}</h4>
                <div>
                  <input type={"date"} onChange={selectDate}></input>
                </div>
                <div>
                  {functions.length
                    ? functions.map((el) => (
                        <button onClick={selectFunction}>{el.time}</button>
                      ))
                    : "No functions where found for this day"}
                </div>
                <Link to={"/tickets"}>
                  <button className={s.btn}>Get tickets</button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <img
            src="https://c.tenor.com/DQyztbEmqnYAAAAM/netflix-loading.gif"
            alt="carganetflix"
          />
        )}
      </div>
    </>
  );
}
