import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms, deleteRoom, getSala } from "../redux/actions";
import img from "../img/btc.png";
import s from "./Styles/DeleteRoom.module.css";

export default function DeleteRoom() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);
  let room = useSelector((state) => state.room);

  const [sala, setSala] = useState([]);
  const [inputDelete, setInputDelete] = useState("");

  useEffect(() => {
    dispatch(getRooms());
  }, [sala]);

  const onChangeSelect = (e) => {
    let room = e.target.value.split(",");
    setSala(room);
    dispatch(getSala(room[0]));
  };
  const onChangeDelete = (e) => {
    setInputDelete(e);
  };

  const borrarRoom = () => {
    dispatch(deleteRoom(sala[0]));
    alert("the room has been successfully deleted");
    setInputDelete("");
    setSala([]);
  };

  return (
    <div>
      <select
        onChange={(e) => onChangeSelect(e)}
        name="selectDelete"
        id="selectDelete"
      >
        <option value="">Selecciona una sala</option>
        {rooms?.map((room) => (
          <option key={room._id} value={[room._id, room.name]}>
            {room.name}
          </option>
        ))}
      </select>
      {sala.length > 0 && <h3 className={s.nombre}>{`Nombre: ${sala[1]}`}</h3>}
      <div className={s.room}>
        {sala.length > 0 &&
          room?.map((seat) => (
            <div key={seat.id}>
              <img className={seat.select ? s.seat : s.noseat} src={img} />
            </div>
          ))}
      </div>
      {sala.length > 0 && (
        <div className={s.borrar}>
          <label className={s.label} htmlFor="inputDelete">
            Escribe "DELETE" para borrar
          </label>
          <input
            onChange={(e) => onChangeDelete(e.target.value)}
            value={inputDelete}
            className={s.input}
            type="text"
            name="inputDelete"
            id="inputDelete"
            placeholder="Sala..."
          />
          {inputDelete === "DELETE" ? (
            <button onClick={borrarRoom} className={s.button}>
              BORRAR
            </button>
          ) : (
            <button className={s.nobutton}>BORRAR</button>
          )}
        </div>
      )}
    </div>
  );
}
