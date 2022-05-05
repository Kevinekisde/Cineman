import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postComment, deleteComment } from "../redux/actions";
import s from "../components/Styles/Comments.module.css";
import TimeAgo from "javascript-time-ago";
import es from "javascript-time-ago/locale/es.json";
import ReactTimeAgo from "react-time-ago";
import Swal from "sweetalert2";

const Comments = () => {
  const { login, userInfo, movieDetail } = useSelector((state) => state);

  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  // TimeAgo.addDefaultLocale(es);
  TimeAgo.addLocale(es);
  // TimeAgo.addDefaultLocale({
  //   locale: "es",
  //   now: {
  //     now: {
  //       current: "ahora",
  //       future: "en un momento",
  //       past: "ahora mismo",
  //     },
  //   },
  //   long: {
  //     year: {
  //       past: {
  //         one: "{0} year ago",
  //         other: "{0} years ago",
  //       },
  //       future: {
  //         one: "in {0} year",
  //         other: "in {0} years",
  //       },
  //     },
  //   },
  // });

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
    setComment("");
  };

  const handleDeleteComments = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "El comentario se borrará!",
      text: "Seguro que deseas continuar?",
      icon: "question",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "El comentarioo ha sido borrado!",
          "The comment has been deleted.",
          "success"
        );

        let newComments = movieComments.filter(
          (c) => c.user.uid !== e.target.value
        );

        console.log(newComments);
        setmovieComments(newComments);
        let commentToDelete = { uid: e.target.value };
        dispatch(deleteComment(movieDetail[0].id, commentToDelete));
      } else {
        return Swal.close();
      }
    });
  };

  return (
    <div className={login || movieComments.length > 0 ? s.main : s.main_logout}>
      <div className={s.comments_container}>
        {movieComments.map((c) => (
          <div key={c.user.displayName} className={s.comments}>
            <img src={c.user.photoURL} alt="" className={s.user_img} />
            <div className={s.comment_container}>
              <div className={s.comment_user_name}>
                Dijo {c.user.displayName}:
              </div>
              <div className={s.comment}>{c.comment}</div>
              <div className={s.comment_date}>
                <ReactTimeAgo date={Date.parse(c.date)} locale="es-AR" />
              </div>
            </div>
            <button
              value={c.user.uid}
              className={
                userInfo?.uid !== "iBTnFMon69gCYZkidwg0TFV58gy1"
                  ? s.delete_comment
                  : s.delete_comment_login
              }
              onClick={(e) => handleDeleteComments(e)}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div onSubmit={(e) => handleSubmit(e)}>
        {login &&
        !movieComments.some(
          (c) => userInfo.displayName === c.user.displayName
        ) ? (
          <form className={s.form}>
            <img src={userInfo.photoURL} alt="" className={s.user_img} />
            <textarea
              className={s.form_textarea}
              placeholder="Dejanos tu opinion..."
              name=""
              id=""
              minLength={4}
              cols="30"
              rows="50"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button className={s.form_submit}>+</button>
          </form>
        ) : (
          <div style={{ color: "white" }}></div>
        )}
      </div>
    </div>
  );
};

export default Comments;
