import axios from "axios";
import Swal from "sweetalert2";
import {
  GET_MOVIES,
  GET_MOVIE_DETAIL,
  ADD_TO_CART,
  REMOVE_ALL_FROM_CART,
  REMOVE_ONE_FROM_CART,
  CLEAR_CART,
  LOGIN,
  LOGOUT,
  CLEAR_DETAIL,
  GET_MOVIE_NAME,
  ADD_MOVIE,
  CREATE_ROOMS,
  SET_SALAS,
  GET_CATEGORYS,
  FILTER_CATEGORY,
  GET_NEXT_MOVIES,
  FILTER_NEXT_MOVIES,
  CLEAR_CHECKOUT,
  FILL_CHECKOUT,
  FILL_LOCAL_CART,
  GET_SALA,
  GET_ROOM,
  GET_ROOMS,
  ADD_FUNCTION,
  PUT_ROOM,
  GET_FUNCTIONS,
  SET_FUNCTION,
  GET_USER,
  POST_COMMENT,
  EDIT_USER,
  TICKET_HANDLER,
  SET_SEATS,
  GET_FUNCTION,
  SELECTED_TICKET,
  FILL_LOCAL_TICKETS,
  GET_PRODUCT,
  FILLED_SEATS,
  DELETE_ROOM,
  GET_DETAIL,
  DELETE_COMMENT,
  LOCAL_STORAGE_FUNCTION,
  CLEAR_FUNCTION_DETAIL,
  DISCOUNT_FUNCTION,
} from "./constants.js";
import { auth, google } from "../firebase";

export function getMovies() {
  return async function (dispatch) {
    try {
      let request = await axios.get("https://cinemanback.herokuapp.com/peliculas");
      return dispatch({ type: GET_MOVIES, payload: request.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function getMoviesById(id) {
  return async function (dispatch) {
    try {
      
      let request = await axios.get(`https://cinemanback.herokuapp.com/peliculas/${id}`);
      return dispatch({ type: GET_MOVIE_DETAIL, payload: request.data });
    } catch (error) {
      console.log(error);
    }
  };
}
//esta es para el detalle en la seleccion de tickets
export function getDetail(id) {
  return async function (dispatch) {
    try {
      let request = await axios.get(
        `https://cinemanback.herokuapp.com/peliculas/uuid/${id}`
      );
      return dispatch({ type: GET_DETAIL, payload: request.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getCategories() {
  return async function (dispatch) {
    try {
      let request = await axios.get("https://cinemanback.herokuapp.com/categorias");
      return dispatch({ type: GET_CATEGORYS, payload: request.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function filterByCategories(payload) {
  return {
    type: FILTER_CATEGORY,
    payload,
  };
}
export function filterNextMovies(payload) {
  return {
    type: FILTER_NEXT_MOVIES,
    payload,
  };
}

export function AddtoCart(id) {
  return async function (dispatch) {
    try {
      return dispatch({ type: ADD_TO_CART, payload: id });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getMovieByName(name) {
  return async function (dispatch) {
    try {
      let request = await axios.get(
        `https://cinemanback.herokuapp.com/peliculas?name=${name}`
      );
      return dispatch({
        type: GET_MOVIE_NAME,
        payload: request.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getProducts() {
  return async function (dispatch) {
    try {
      let request = await axios.get(`https://cinemanback.herokuapp.com/products/i`);
      return dispatch({
        type: GET_PRODUCT,
        payload: request.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function RemoveOneFromCart(id) {
  return async function (dispatch) {
    try {
      return dispatch({ type: REMOVE_ONE_FROM_CART, payload: id });
    } catch (error) {
      console.log(error);
    }
  };
}
export function RemoveAllFromCart(id) {
  return async function (dispatch) {
    try {
      return dispatch({ type: REMOVE_ALL_FROM_CART, payload: id });
    } catch (error) {
      console.log(error);
    }
  };
}
export function ClearCart() {
  return async function (dispatch) {
    try {
      return dispatch({ type: CLEAR_CART });
    } catch (error) {
      console.log(error);
    }
  };
}

export function clearDetail(dispatch) {
  return dispatch({ type: CLEAR_DETAIL });
}

export const login = (dispatch) => {
  auth
    .signInWithPopup(google)
    .then((result) => {
      localStorage.setItem("user", JSON.stringify(result.user));
      return dispatch({
        type: LOGIN,
        payload: result.user,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logout = (dispatch) => {
  auth
    .signOut()
    .then(() => {
      localStorage.clear();
      return dispatch({
        type: LOGOUT,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export function addMovie(payload) {
  return async (dispatch) => {
    try {
      const post = await axios.post("https://cinemanback.herokuapp.com/admin/add", payload);
      return post;
    } catch (error) {
      console.log(error.message);
    }
  };
}
// esto crea una función con la movie y sala especificados
export function addFunction(payload) {
  return async (dispatch) => {
    try {
      await axios.post("https://cinemanback.herokuapp.com/admin/addF", payload);
      return dispatch({ type: ADD_FUNCTION, payload });
    } catch (error) {
      console.log(error.message);
    }
  };
}

//esto trae todas las funciones en db....
export function getFunctions() {
  return async function (dispatch) {
    try {
      let request = await axios.get("https://cinemanback.herokuapp.com/functions");
      return dispatch({ type: GET_FUNCTIONS, payload: request.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}
// esto crea una sala con el layout especificado..
export function createRoom(payload) {
  return async (dispatch) => {
    try {
      await axios.post("https://cinemanback.herokuapp.com/admin/create", payload);
      return dispatch({ type: CREATE_ROOMS, payload });
    } catch (error) {
      console.log("algoo");
    }
  };
}
//esto devuelve una sala de la db por su id...
export const getSala = (id) => {
  return async (dispatch) => {
    try {
      const room = await axios.get(`https://cinemanback.herokuapp.com/admin/rooms/${id}`);
      return dispatch({ type: GET_SALA, payload: room.data });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getRoom = (id) => {
  return async (dispatch) => {
    try {
      const room = await axios.get(`https://cinemanback.herokuapp.com/${id}`);
      return dispatch({ type: GET_ROOM, payload: room.data });
    } catch (err) {
      console.log(err);
    }
  };
};
// estp hace lo mismo que la de arriba :v son lo mismo -------------------
export function getRooms() {
  return async function (dispatch) {
    try {
      let request = await axios.get("https://cinemanback.herokuapp.com/admin/rooms");
      return dispatch({ type: GET_ROOMS, payload: request.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}
// -----------------------------------
//pasa las salas al estado.....
export const setSalas = (sala) => {
  return function (dispatch) {
    return dispatch({ type: SET_SALAS, payload: sala });
  };
};
//pasa la funcion al estado.....
export const setFunction = (payload) => {
  return function (dispatch) {
    return dispatch({ type: SET_FUNCTION, payload });
  };
};

export const clearFunction = () => {
  return function (dispatch) {
    return dispatch({ type: "UNSET_FUNCTION" });
  };
};

//esto modifica los asiendos ocupados en una funcion
export const setSeats = (id, data) => {
  return async function (dispatch) {
    await axios.put(`https://cinemanback.herokuapp.com/functions?id=${id}`, data);
    return dispatch({
      type: SET_SEATS,
    });
  };
};
// eso hace lo mismo pero a la sala... (para modificar salas)
export const putRoom = (sala, id) => {
  return async function (dispatch) {
    try {
      await axios.put(`https://cinemanback.herokuapp.com/admin/rooms/${id}`, sala);
      return dispatch({ type: PUT_ROOM, payload: sala });
    } catch (err) {
      console.error(err);
    }
  };
};

export const deleteRoom = (id) => {
  return async function (dispatch) {
    await axios.delete(`https://cinemanback.herokuapp.com/admin/create/${id}`);
    return dispatch({ type: DELETE_ROOM, payload: id });
  };
};

export const checkOut = (cart) => {
  return function (dispatch) {
    return dispatch({ type: FILL_CHECKOUT, payload: cart });
  };
};

export const checkOutClear = () => {
  return function (dispatch) {
    return dispatch({ type: CLEAR_CHECKOUT });
  };
};

export const localStorageCart = (payload) => {
  return function (dispatch) {
    return dispatch({ type: FILL_LOCAL_CART, payload });
  };
};

export const localStorageTickets = (payload) => {
  return function (dispatch) {
    return dispatch({ type: FILL_LOCAL_TICKETS, payload });
  };
};

export const createUser = (payload) => {
  return async function (dispatch) {
    const json = await axios.post(
      "https://cinemanback.herokuapp.com/user/createuser",
      payload
    );
    return json;
  };
};

export const getUserInfo = (id) => {
  return async function (dispatch) {
    try {
      let request = await axios.get(`https://cinemanback.herokuapp.com/user/${id}`);
      return dispatch({ type: GET_USER, payload: request.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postComment = (payload) => {
  return async function (dispatch) {
    try {
      await axios.post(`https://cinemanback.herokuapp.com/user/comments`, payload);

      return dispatch({ type: POST_COMMENT, payload });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editUser = (id, data) => {
  return async function (dispatch) {
    await axios.put(`https://cinemanback.herokuapp.com/user/${id}`, data);
    return dispatch({
      type: EDIT_USER,
    });
  };
};
export const ticketHandler = (total_price) => {
  return async function (dispatch) {
    return dispatch({ type: TICKET_HANDLER, payload: total_price });
  };
};

export const getFunction = (id) => {
  return async function (dispatch) {
    let funcion = await axios.get(`https://cinemanback.herokuapp.com/functions/${id}`);
    return dispatch({ type: GET_FUNCTION, payload: funcion.data });
  };
};

export const setPurchaseTickets = (tickets) => {
  return function (dispatch) {
    return dispatch({ type: SELECTED_TICKET, payload: tickets });
  };
};
export const fillSeats = (contadorasientos) => {
  return function (dispatch) {
    return dispatch({ type: FILLED_SEATS, payload: contadorasientos });
  };
};

export const deleteComment = (movieId, data) => {
  console.log(data);
  return async function (dispatch) {
    await axios.put(`https://cinemanback.herokuapp.com/admin/comments/${movieId}`, data);
    return dispatch({ type: DELETE_COMMENT });
  };
};
export const localStorageFunction = (funcion) => {
  return async function (dispatch) {
    return dispatch({ type: LOCAL_STORAGE_FUNCTION, payload: funcion });
  };
};

export const clearFunctionDetail = () => {
  return async function (dispatch) {
    return dispatch({ type: CLEAR_FUNCTION_DETAIL });
  };
};

export const discountAction = (payload) => {
  return async function (dispatch) {
    return dispatch({ type: DISCOUNT_FUNCTION, payload: payload });
  };
};
