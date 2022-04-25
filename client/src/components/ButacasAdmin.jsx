import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import s from "./Styles/ButacasAdmin.module.css";
import img from "../img/btc.png";
import { createRoom } from "../redux/actions";

function validate(name) {
  let errors = {};
  if (!name) {
    errors.name = "Room name is required";
  } else if (name?.indexOf(" ") === 0) {
    errors.name = "No empty spaces allowed";
  }
  return errors;
}

export default function Butacas() {
  const [asientos, setAsientos] = useState([]);
  const [botonesColumnas, setBotonesColumnas] = useState([]);
  const [botonesFilas, setBotonesFilas] = useState([]);
  const [name, setName] = useState("");
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();

  const seats = 265;

  //prettier-ignore
  const abc = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

  useEffect(() => {
    agregar();
  }, [dispatch]);

  useEffect(() => {
    setErrors(validate(name));
  }, [name]);

  function agregar() {
    setAsientos([]);
    let i = 1; // numero de iteraciones
    let j = 0; // indice de letra
    let k = 1; // reinicio de indice
    while (i < seats) {
      let nuevoObjeto = {
        id: i,
        columna: k,
        fila: abc[j],
        select: true,
        status: "disponible",
      };
      setAsientos((old) => [...old, nuevoObjeto]);
      if (i % 24 === 0) {
        j++;
        k = 0;
      }
      i++;
      k++;
    }
  }

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
          fila: "",
          select: false,
          status: "disponible",
        };
      }
    });
    const objRoom = {
      name,
      seats: nuevosAsientos,
    };

    dispatch(createRoom(objRoom));
    alert("Room was added to the db");
    setName("");
    agregar();
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

  return (
    <div className={s.root}>
      <div className={s.columnas}>
        {botonesColumnas.map((boton) => (
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
      <div className={s.asientos}>
        {asientos.map((el) => (
          <div
            key={el.id}
            className={s.block}
            onClick={() => (el.select ? addSeat(el.id) : deleteSeat(el.id))}
          >
            <img
              className={el.select ? `${s.imgseat}` : `${s.imgnoseat}`}
              src={img}
              alt=""
            />
          </div>
        ))}
      </div>
      <div>
        {botonesFilas.map((boton) => (
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
        <label>Nombre de sala</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        {errors?.name && <p className="danger">{errors?.name}</p>}
      </div>
      {!errors?.name ? <button onClick={asignarPosiciones}>Crear</button> : ""}
    </div>
  );
}
