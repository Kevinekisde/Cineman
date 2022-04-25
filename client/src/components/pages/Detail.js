import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoviesById,
  clearDetail,
  getFunctions,
  setFunction,
  ClearCart,
  checkOutClear,
  setPurchaseTickets,
} from "../../redux/actions";
import { useParams, useNavigate } from "react-router-dom";
import ContentLoader from "react-content-loader";
import "animate.css";
import Swal from "sweetalert2";
import Header from "../sections/Header";
import {
  Button,
  Container,
  Content,
  DetailContent,
  MovieBox,
  MovieInfo,
  MovieTrailer,
} from "./DetailStyles";
import Player from "../Player.jsx";
import Loading from "../Loading";
import Comments from "../Comments";
import Functions from "./Functions";

const Detail = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allFunctions = useSelector((state) => state.functions);
  const userState = useSelector((state) => state.login)
  const myPeli = useSelector((state) => state.movieDetail);

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

  useEffect(() => {
    dispatch(ClearCart());
    dispatch(checkOutClear());
    dispatch(setPurchaseTickets([]));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFunctions());
    // console.log(myPeli[0]?._id);
    // console.log(allFunctions[12].movie);
    setTimeout(() => {
      dispatch(getMoviesById(id));
    }, 1800);
  }, []);

  useLayoutEffect(() => {
    return () => {
      dispatch(clearDetail);
    };
  }, [dispatch]);


  const handlertoBuy=() => {
    if(userState == true) {
      navigate("/selectickets")
    }else{
      Swal.fire({
        title: "Es necesario Iniciar sesion",
        text: "Debes tener una cuenta para comprar",
        icon: "error",
        showCloseButton: true,
        confirmButtonText: "Loguearse",
      }).then((result) => {
        if(result.isConfirmed){
          navigate("/register1")
        }
      })
    }

  }

  const [showFunctions, setShowFunctions] = useState(false);

  let FunctionsFilteredByMovie = allFunctions.filter(
    (el) => el.movie === myPeli[0]?._id
  );
  // console.log(FunctionsFilteredByMovie);

  return (
    <>
      {myPeli[0]?.name.length > 0 ? (
        <>
          <Container>
            <Player url={myPeli[0]?.trailer} />
            <Header />
            <Content>
              <DetailContent>
                <MovieBox className="animate__animated animate__backInDown">
                  <MovieInfo>
                    <h2>{myPeli[0]?.name}</h2>
                    <div id="category">
                      {myPeli[0].category.map((el) => (
                        <h3 style={selectStyle(el)}>{el}</h3>
                      ))}
                    </div>
                    <p>{myPeli[0]?.review}</p>
                  </MovieInfo>
                  <div>
                    <Button onClick={handlertoBuy}>
                      Buy Now
                    </Button>
                    <a href={myPeli[0]?.officialSite} target="blank">
                      <Button>Official Site</Button>
                    </a>
                  </div>
                </MovieBox>
                {/* <MovieTrailer>
            <img src="/images/Play.png" alt="playbutton" />
            <p>Watch Trailer</p>
          </MovieTrailer> */}
                <MovieBox>
                  <img
                    src={myPeli[0]?.poster}
                    style={{ width: "40%", height: "100%" }}
                    alt="poster"
                  />
                </MovieBox>
              </DetailContent>
            </Content>
            <Comments style={{ alignSelf: "end" }}></Comments>
          </Container>
          <Functions funciones={FunctionsFilteredByMovie} />
        </>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
};

export default Detail;
