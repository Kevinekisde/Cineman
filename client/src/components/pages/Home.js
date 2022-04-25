import { useEffect } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import {
  Board,
  Cards,
  Container,
  Content,
  Title,
  Scroll,
  Scroll2,
  Select,
} from "./HomeStyles";
import {
  getCategories,
  getMovies,
  filterByCategories,
  filterNextMovies,
  ClearCart,
  clearDetail,
  checkOutClear,
  setPurchaseTickets,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

import Movie from "../organisms/Movie";
import Loading from "../Loading";
import SearchBar from "../sections/SearchBar";

const Home = () => {
  const dispatch = useDispatch();
  const elverdaderoAllMovies = useSelector((state) => state.allmovies); //El Verdadero
  const allMovies = useSelector((state) => state.movies);
  const nextMovies = useSelector((state) => state.nextmovies);
  const allCategorys = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getCategories());
    dispatch(ClearCart());
    dispatch(checkOutClear());
    dispatch(setPurchaseTickets([]));
  }, [dispatch]);

  const handleSelect = (e) => {
    dispatch(filterByCategories(e.target.value));
  };

  const handleSelect2 = (e) => {
    dispatch(filterNextMovies(e.target.value));
  };

  const billBoard = document.getElementById("ashe");

  let intervalo = null;

  const start = () => {
    if (intervalo == null) {
      intervalo = setInterval(() => {
        if (typeof billBoard.scrollLeft !== "null") billBoard.scrollLeft += 5;
      }, 10);
    }
  };

  const start2 = () => {
    intervalo = setInterval(() => {
      if (typeof billBoard.scrollLeft !== "null") billBoard.scrollLeft -= 5;
    }, 10);
  };

  const stop = () => {
    clearInterval(intervalo);
    intervalo = null;
  };

  const derecha = () => {
    billBoard.scrollLeft += 50;
  };

  return (
    <>
      {allMovies[0]?.name ? (
        <Container>
          <Header />
          <Content>
            <Board>
              <Title>
                <h2>On Billboard</h2>
                <div></div>
                <Select>
                  <select onChange={handleSelect}>
                    <option value="all">All</option>
                    {allCategorys.map((el) => {
                      if (
                        elverdaderoAllMovies.some(
                          (el2) =>
                            !el2.comingsoon && el2.category?.includes(el.name)
                        )
                      ) {
                        return <option value={el.name}>{el.name}</option>;
                      }
                    })}
                  </select>
                </Select>
              </Title>
              <SearchBar></SearchBar>
              <Scroll2 onMouseOver={start2} onMouseLeave={stop} />
              <Cards id="ashe">
                {allMovies.map(
                  (movie, i) =>
                    !movie.comingsoon && (
                      <Movie
                        key={movie.id}
                        id={movie.id}
                        name={movie.name}
                        background={i === 0 ? movie.image : movie.poster}
                        backgroundPoster={movie.image}
                        category={movie.category}
                        functions={movie.functions}
                        isLength={
                          i ==
                          allMovies.filter((el) => !el.comingsoon).length - 1
                            ? "c"
                            : false
                        }
                        scroll={start}
                        stop={stop}
                        derecha={derecha}
                        rating={movie.rating}
                      />
                    )
                )}
              </Cards>
              <Scroll onMouseOver={() => start()} onMouseLeave={() => stop()} />
            </Board>
            <Board>
              <Title>
                <h2>Next Releases</h2>
                <div></div>
                <Select>
                  <select onChange={handleSelect2}>
                    <option value="all">All</option>
                    {allCategorys.map((el) => {
                      if (
                        elverdaderoAllMovies.some(
                          (el2) =>
                            el2.comingsoon && el2.category?.includes(el.name)
                        )
                      ) {
                        return <option value={el.name}>{el.name}</option>;
                      }
                    })}
                  </select>
                </Select>
              </Title>
              <Cards>
                {nextMovies.map(
                  (movie, i) =>
                    movie.comingsoon && (
                      <Movie
                        key={movie.id}
                        id={movie.id}
                        name={movie.name}
                        background={i === 0 ? movie.image : movie.poster}
                        backgroundPoster={movie.image}
                        category={movie.category}
                        functions={movie.functions}
                      />
                    )
                )}
              </Cards>
            </Board>
          </Content>
          <Footer />
        </Container>
      ) : (
        <Loading></Loading>
      )}
    </>
  );
};

export default Home;
