import React, { useEffect } from "react";
import FileBase64 from "react-file-base64";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getCategories, getUserInfo, editUser } from "../../redux/actions";
import s from "./User.module.css";
import Swal from "sweetalert2";
import "animate.css";

function validate(input) {
  var regex = new RegExp("^[0-9-]+$");
  let errors = {};
  if (
    !input.name ||
    input.name.includes(" ") ||
    input.name.match(regex) ||
    input.name.length < 3 ||
    /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\d/?~`]/.test(input.name)
  ) {
    errors.name = "Se requiere un Nombre Valido mayor de 3 letras";
  } else if (
    !input.phone ||
    input.phone.includes(" ") ||
    !input.phone.match(regex) ||
    input.phone.length > 11
  ) {
    errors.phone = "Se requiere un Numero valido";
  } else if (
    !input.birthday ||
    input.birthday.length > 10 ||
    input.birthday.charAt(0) > "2"
  ) {
    errors.birthday = "Ingrese su fecha de nacimiento";
  } else if (!input.favoriteGenre.length > 0) {
    errors.favoriteGenre = "Seleccione un Genero de peliculas";
  }

  const button = document.getElementById("Button");
  const buttonDiscard = document.getElementById("ButtonDiscard");

  if (
    !errors.name ||
    !errors.phone ||
    !errors.birthday ||
    !errors.favoriteGenre
  ) {
    button.style.display = "block";
    buttonDiscard.style.display = "block";
  }

  if (errors.name || errors.phone || errors.birthday || errors.favoriteGenre) {
    button.innerHTML = "🔒";
    button.disabled = true;
  } else {
    console.log("no hay error");
    button.innerHTML = "✔";
    button.disabled = false;
  }

  return errors;
}

const User = () => {
  let { id } = useParams();
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.allCategory);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserInfo(id));
    dispatch(getCategories());
  }, [dispatch, id]);

  const navigate = useNavigate();

  const [error, setError] = useState({});

  const [newInfo, setNewInfo] = useState({
    image: user[0]?.image,
    name: "",
    email: "",
    phone: "",
    favoriteGenre: "",
    birthday: "",
  });

  const [backupinfo, setBackupInfo] = useState({
    name: "",
    email: "",
    phone: "",
    favoriteGenre: "",
    birthday: "",
  });

  useEffect(() => {
    setBackupInfo({
      image: user[0]?.image,
      name: user[0]?.name,
      email: user[0]?.email,
      phone: user[0]?.phone,
      favoriteGenre: user[0]?.favoriteGenre,
      birthday: user[0]?.birthday,
    });
  }, [user]);

  const handleSelect = (e) => {
    setNewInfo({
      ...newInfo,
      favoriteGenre: e.target.value,
    });
    setError(
      validate({
        ...newInfo,
        favoriteGenre: e.target.value,
      })
    );
  };

  const handleChange = (e) => {
    setNewInfo({
      ...newInfo,
      [e.target.name]: e.target.value,
    });
    setError(
      validate({
        ...newInfo,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleChangeMode = () => {
    if (editMode == true) {
      setEditMode(false);
    } else if (editMode == false) {
      setEditMode(true);
    }

    const button = document.getElementById("input");
    if (button.style.display == "none") {
      button.style.display = "block";
    } else if (button.style.display == "block") {
      button.style.display = "none";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser(id, newInfo));
    document.getElementById("Button").disabled = "true";
    Swal.fire({
      title: "Guardar Cambios",
      text: "Seguro que deseas continuar?",
      icon: "question",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Tus datos han sido actualizados!",
          "Your file has been deleted.",
          "success"
        );
        window.location.reload();
      } else {
        Swal.close();
      }
    });
  };
  const handleSubmitDiscard = (e) => {
    e.preventDefault();
    dispatch(editUser(id, backupinfo));
    document.getElementById("Button").disabled = "true";
    Swal.fire({
      title: "Tus datos nuevos se borraran!",
      text: "Seguro que deseas continuar?",
      icon: "question",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Tus datos han sido restaurados!",
          "Your file has been deleted.",
          "success"
        );
        window.location.reload();
      } else {
        Swal.close();
      }
    });
  };

  const selectStyle = (el) => {
    if (el == "Normal") return { color: "white" };
    if (el == "Premium") return { color: "#F8E11B" };
  };

  return (
    <>
      {user.length > 0 ? (
        <div className={s.container}>
          <div className={s.containerBlack}>
            <div
              className={s.infoContainer}
              class="animate__animated animate__backInLeft"
              style={{ height: "100%", width: "85%", marginLeft: "8%" }}
            >
              <div className={s.InfoName}>
                <h2
                  className={s.infotitle}
                  style={{ fontSize: "15px", cursor: "pointer" }}
                  onClick={() => navigate("/home")}
                >
                  Volver
                </h2>
                <h2 className={s.infotitle}>UserInfo</h2>
                <div className={s.bar}></div>
                <button onClick={handleChangeMode} className={s.buttonDown}>
                  <Icon
                    icon="heroicons-solid:pencil-alt"
                    color="#f8f8f8"
                    height="30"
                  />
                </button>
              </div>
              <div className={s.userInfocontainer}>
                <div className={s.photoandsub}>
                  <img className={s.userPhoto} src={user[0].image}></img>
                  <div id="input" style={{ display: "none" }}>
                    <FileBase64
                      multiple={false}
                      onDone={({ base64 }) =>
                        setNewInfo({
                          ...newInfo,
                          image: base64,
                        })
                      }
                    />
                  </div>
                  <h2
                    className={s.substatustext}
                    style={selectStyle(user[0].subcription)}
                  >
                    <Icon
                      icon="fluent:ticket-diagonal-24-filled"
                      color={selectStyle(user[0].subcription)}
                      height="30"
                    />
                    {user[0].subcription}
                  </h2>
                </div>
              </div>
              {editMode == false ? (
                <div className={s.userInfo}>
                  <div className={s.Info}>
                    <h1 className={s.Text}>Username</h1>
                    <div className={s.inputInfo}>
                      <h3 className={s.userName}>{user[0].name}</h3>
                      <div className={s.line}></div>
                    </div>
                  </div>
                  <div className={s.Info}>
                    <h1 className={s.Text}>Email</h1>
                    <div className={s.inputInfo}>
                      <h3 className={s.userName}>{user[0].email}</h3>
                      <div className={s.line}></div>
                    </div>
                  </div>
                  <div className={s.Info}>
                    <h1 className={s.Text}>Phone</h1>
                    <div className={s.inputInfo}>
                      <h3 className={s.userName}>{user[0].phone}</h3>
                      <div className={s.line}></div>
                    </div>
                  </div>
                  <div className={s.Info}>
                    <h1 className={s.Text}>Favorite Category</h1>
                    <div className={s.inputInfo}>
                      <h3 className={s.userName}>{user[0].favoriteGenre}</h3>
                      <div className={s.line}></div>
                    </div>
                  </div>
                  <div className={s.Info}>
                    <h1 className={s.Text}>Birthday</h1>
                    <div className={s.inputInfo}>
                      <h3 className={s.userName}>{user[0].birthday}</h3>
                      <div className={s.line}></div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => handleSubmit(e)} className={s.UserForm}>
                  <div className={s.Info}>
                    <label className={s.Text} value="name">
                      Username
                    </label>
                    <div className={s.inputInfo}>
                      <input
                        name="name"
                        value={newInfo.name}
                        onChange={handleChange}
                        className={s.inputinput}
                        placeholder={backupinfo.name}
                      ></input>
                      {error?.name && <p className={s.error}>{error?.name}</p>}
                    </div>
                  </div>
                  <div className={s.Info}>
                    <label className={s.Text}>Phone</label>
                    <div className={s.inputInfo}>
                      <input
                        name="phone"
                        value={newInfo.phone}
                        onChange={handleChange}
                        className={s.inputinput}
                        placeholder={backupinfo.phone}
                      ></input>
                      {error?.phone && (
                        <p className={s.error}>{error?.phone}</p>
                      )}
                    </div>
                  </div>
                  <div className={s.Info}>
                    <label className={s.Text}>Birthday</label>
                    <div className={s.inputInfo}>
                      <input
                        name="birthday"
                        value={newInfo.birthday}
                        onChange={handleChange}
                        type="date"
                        className={s.inputinput}
                        placeholder={backupinfo.birthday}
                      ></input>
                      {error?.birthday && (
                        <p className={s.error}>{error?.birthday}</p>
                      )}
                    </div>
                  </div>
                  <div className={s.Info}>
                    <label className={s.Text}>Favorite Category</label>
                    <div className={s.inputInfo}>
                      <select
                        className={s.inputselect}
                        id="Select"
                        onChange={handleSelect}
                      >
                        {category.map((type) => (
                          <option value={type.name}>{type.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button
                    id="Button"
                    className={s.buttonUpdate}
                    style={{ backgroundColor: "Green", display: "none" }}
                    type="submit"
                    disabled
                  ></button>
                  <button
                    id="ButtonDiscard"
                    onClick={handleSubmitDiscard}
                    className={s.buttonUpdate}
                    style={{ backgroundColor: "Red", display: "none" }}
                  >
                    <Icon icon="bxs:trash" color="#f8f8f8" height="30" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h1>Cargando</h1>
      )}
    </>
  );
};

export default User;
