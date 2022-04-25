import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMoviesById, postComment } from "../redux/actions";
// import s from "../components/Styles/Comments.module.css";
import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es.json";
import ReactTimeAgo from "react-time-ago";

const Comments = () => {
  const { login, userInfo, movieDetail } = useSelector((state) => state);
  //   const user = useSelector((state) => state.userInfo);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  TimeAgo.addDefaultLocale(es);
  TimeAgo.addDefaultLocale({
    locale: "es",
    now: {
      now: {
        current: "ahora",
        future: "en un momento",
        past: "ahora mismo",
      },
    },
    long: {
      year: {
        past: {
          one: "{0} year ago",
          other: "{0} years ago",
        },
        future: {
          one: "in {0} year",
          other: "in {0} years",
        },
      },
    },
  });
  //pido una pelicula por su nombre para probar el componente (Harcodeo Style)
  // useEffect(() => {
  //   dispatch(getMoviesById(1));
  // }, [dispatch]);

  const [alreadyComment, setalreadyComment] = useState(false);

  const [movieComments, setmovieComments] = useState([
    ...movieDetail[0]?.comments,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let date = new Date();

    const newComment = {
      user: userInfo,
      comment,
      movie: movieDetail[0]._id,
      date: date,
    };

    if (
      alreadyComment === false &&
      !movieComments.some((c) => userInfo.displayName === c.user)
    ) {
      setmovieComments([
        ...movieComments,
        {
          user: userInfo,
          comment,
          date: date,
        },
      ]);
      setalreadyComment(true);
    }
    dispatch(postComment(newComment));
  };

  return (
    <div
      style={
        login || movieComments.length > 0
          ? {
              margin: "0",
              padding: "0",
              width: "100vw",
              height: "15vh",
              display: "flex",
              flexDirection: "row-reverse",
              backgroundColor: "rgba(0, 0, 0, 0.43)",
              borderRadius: "20px",
              justifyContent: "start",
              alignItems: "center",
              textAlign: "left",
            }
          : { display: "none" }
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          marginLeft: "20px",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {movieComments.map((c) => (
          <div
            style={{
              display: "flex",
              gap: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            <img
              src={c.user.photoURL}
              alt=""
              width="50px"
              height="50px"
              style={{ borderRadius: "100px" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // gap: "10px",
              }}
            >
              <div style={{ color: "white" }}>Dijo {c.user.displayName}:</div>
              <div style={{ color: "white", marginBottom: "30px" }}>
                {c.comment}
              </div>
              <div style={{ color: "white" }}>
                <ReactTimeAgo date={c.date} locale="es-AR" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div onSubmit={(e) => handleSubmit(e)}>
        {login &&
        !movieComments.some(
          (c) => userInfo.displayName === c.user.displayName
        ) ? (
          <form
            style={{
              marginLeft: "2vw",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img
              src={userInfo.photoURL}
              alt=""
              width="50px"
              style={{ borderRadius: "50px" }}
            />
            <textarea
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderRadius: "20px",
                color: "white",
                padding: "5px",
                height: "80px",
                resize: "none",
              }}
              placeholder="Dejanos tu opinion..."
              name=""
              id=""
              cols="30"
              rows="50"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              style={{
                borderRadius: "9px",
                padding: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                height: "35px",
              }}
            >
              Submit
            </button>
          </form>
        ) : (
          <div style={{ color: "white" }}></div>
        )}
      </div>
    </div>
  );
};

export default Comments;
