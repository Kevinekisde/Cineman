import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSala, getRooms, putRoom } from "../redux/actions";
import s from "./Styles/EditButacas.module.css";
import img from "../img/btc.png";

export default function EditButacas() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms);
  const room = useSelector((state) => state.room);

  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [asientos, setAsientos] = useState([]);
  const [botonesColumnas, setBotonesColumnas] = useState([]);
  const [botonesFilas, setBotonesFilas] = useState([]);

  //prettier-ignore
  const abc = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

  useEffect(() => {
    dispatch(getRooms());
  }, []);

  useEffect(() => {
    agregar();
  }, [room]);

  function agregar() {
    setAsientos([]);
    let i = 1;
    room?.map((seat) => {
      let newSeat = { ...seat, columna: i };
      setAsientos((old) => [...old, newSeat]);
      if (i === 24) i = 0;
      i++;
    });
  }

  const setId = (e) => {
    let value = e.target.value.split(",");
    setRoomId(value[0]);
    setRoomName(value[1]);
  };

  const onClick = () => {
    dispatch(getSala(roomId));
  };

  const deleteSeat = (id) => {
    setAsientos((old) =>
      old.map((asiento) => {
        if (asiento.id === id) {
          asiento.select = true;
        }
        return asiento;
      })
    );
  };

  const addSeat = (id) => {
    setAsientos((old) =>
      old.map((asiento) => {
        if (asiento.id === id) {
          asiento.select = false;
        }
        return asiento;
      })
    );
  };

  if (botonesFilas.length === 0) {
    for (let i = 0; i < 11; i++) {
      let objBotones = { id: abc[i], click: false };
      setBotonesFilas((old) => [...old, objBotones]);
    }
  }

  if (botonesColumnas.length === 0) {
    for (let i = 1; i < 25; i++) {
      let objBotones = { id: i, click: false };
      setBotonesColumnas((old) => [...old, objBotones]);
    }
  }

  const asignarBotonesColumnas = (valor, columnId) => {
    let nuevosBotones = botonesColumnas.map((boton) => {
      if (boton.id === columnId) {
        return { ...boton, click: valor };
      } else {
        return boton;
      }
    });
    return nuevosBotones;
  };

  const asignarBotonesFilas = (valor, filaId) => {
    let nuevosBotones = botonesFilas.map((boton) => {
      if (boton.id === filaId) {
        return { ...boton, click: valor };
      } else {
        return boton;
      }
    });
    return nuevosBotones;
  };

  const deleteColumn = (columnId) => {
    let nuevosAsientos = asientos.map((seat) => {
      if (seat.columna === columnId) {
        return { ...seat, select: false };
      } else {
        return seat;
      }
    });
    setAsientos(nuevosAsientos);
    setBotonesColumnas(asignarBotonesColumnas(true, columnId));
  };

  const addColumn = (columnId) => {
    let nuevosAsientos = asientos.map((seat) => {
      if (seat.columna === columnId) {
        return { ...seat, select: true };
      } else {
        return seat;
      }
    });
    setAsientos(nuevosAsientos);
    setBotonesColumnas(asignarBotonesColumnas(false, columnId));
  };

  const addFila = (filaId) => {
    let nuevosAsientos = asientos.map((seat) => {
      if (seat.fila === filaId) {
        return { ...seat, select: true };
      } else {
        return seat;
      }
    });
    setAsientos(nuevosAsientos);
    setBotonesFilas(asignarBotonesFilas(false, filaId));
  };

  const deleteFila = (filaId) => {
    let nuevosAsientos = asientos.map((seat) => {
      if (seat.fila === filaId) {
        return { ...seat, select: false };
      } else {
        return seat;
      }
    });
    setAsientos(nuevosAsientos);
    setBotonesFilas(asignarBotonesFilas(true, filaId));
  };

  const asignarPosiciones = () => {
    let i = 0;
    let actualFila = "a";
    let nuevosAsientos = asientos.map((a) => {
      if (actualFila !== a.fila) {
        i = 0;
        actualFila = a.fila;
      }
      if (a.select) {
        i++;
        return {
          id: a.id,
          columna: i,
          fila: a.fila,
          select: true,
          status: "disponible",
        };
      } else {
        return {
          id: a.id,
          columna: 0,
          fila: a.fila,
          select: false,
          status: "disponible",
        };
      }
    });
    const objRoom = {
      name: roomName,
      seats: nuevosAsientos,
    };

    dispatch(putRoom(objRoom, roomId));
    alert("the room has been successfully edited");
    setAsientos([]);
  };

  return (
    <div>
      <select name="setId" id="setId" onChange={(e) => setId(e)}>
        <option value="">Seleciona una sala</option>
        {rooms?.map((room) =>
          room.name ? (
            <option value={[room._id, room.name]}>{room.name}</option>
          ) : (
            <option value={room._id}></option>
          )
        )}
      </select>
      <button onClick={onClick}>Editar</button>
      <div className={s.buttontop}>
        {asientos.length > 0 &&
          botonesFilas.map((boton) => (
            <button
              key={boton.id}
              onClick={() =>
                boton.click ? addFila(boton.id) : deleteFila(boton.id)
              }
            >
              {boton.id}
            </button>
          ))}
      </div>
      <div>
        <div className={s.sillas}>
          {asientos?.map((seat) => (
            <div
              key={seat.id}
              className={s.block}
              onClick={() =>
                seat.select ? addSeat(seat.id) : deleteSeat(seat.id)
              }
            >
              {
                <img
                  className={seat.select ? `${s.imgseat}` : `${s.imgnoseat}`}
                  src={img}
                />
              }
            </div>
          ))}
        </div>
        <div className={s.columnas}>
          {asientos.length > 0 &&
            botonesColumnas.map((boton) => (
              <button
                key={boton.id}
                onClick={() =>
                  boton.click ? addColumn(boton.id) : deleteColumn(boton.id)
                }
              >
                {boton.id}
              </button>
            ))}
        </div>
      </div>
      {asientos.length > 0 && (
        <button onClick={asignarPosiciones}>Guardar cambios</button>
      )}
    </div>
  );
}
