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
  CREATE_ROOMS,
  GET_CATEGORYS,
  FILTER_CATEGORY,
  FILTER_NEXT_MOVIES,
  GET_NEXT_MOVIES,
  FILL_CHECKOUT,
  CLEAR_CHECKOUT,
  FILL_LOCAL_CART,
  GET_SALA,
  GET_ROOMS,
  SET_SALAS,
  GET_FUNCTIONS,
  SET_FUNCTION,
  CREATE_USER,
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
  GET_ROOM,
  GET_DETAIL,
  DELETE_COMMENT,
  LOCAL_STORAGE_FUNCTION,
  CLEAR_FUNCTION_DETAIL,
  DISCOUNT_FUNCTION,
} from "./constants.js";

export const initialState = {
  movies: [],
  nextmovies: [],
  allmovies: [],
  movieDetail: [],
  products: [], //esto viene del modelo del back
  login: false,
  userInfo: {},
  cart: [], //aca se acumulan los productos del carrito de compras.
  cartTotal: [],
  allCategory: [],
  category: [],
  nextCategory: [],
  checkout: {},
  room: [],
  filledSeats: [],
  rooms: [],
  functions: [],
  user: {},
  selectedTickets: [],
  entradas: [
    {
      id: 1,
      title: "Ticket para niños menores de 13 años",
      unit_price: 400,
    },
    {
      id: 2,
      title: "Ticket para personas mayores de 13 años",
      unit_price: 800,
    },
    {
      id: 3,
      title: "Ticket para personas con discapacidad o mayores de 65 años",
      unit_price: 400,
    },
  ],
  functionDetail: {},
  PromosPremium: [
    {
      stock: 50,
      _id: "6265bf45767fd0e7f0fdf8a9",
      id: 5,
      image:
        "https://www.lays.com/sites/lays.com/files/2020-11/lays-Classic-small.jpg",
      unit_price: 200,
      title: "Papas Lays",
    },
    {
      stock: 50,
      _id: "6265bf45767fd0e7f0fdf8a9",
      id: 3,
      image:
        "https://www.lays.com/sites/lays.com/files/2020-11/lays-Classic-small.jpg",
      unit_price: 200,
      title: "Papas Lays",
    },
    {
      stock: 50,
      _id: "6265bf3a767fd0e7f0fdf8a7",
      id: 4,
      image:
        "https://t4.ftcdn.net/jpg/02/72/09/39/360_F_272093982_W3N1mvvVBTi9ri45jjKxUMER8X1IrVjD.jpg",
      unit_price: 700,
      title: "Combo 2",
    },
    {
      stock: 50,
      _id: "6265bf0f767fd0e7f0fdf8a1",
      id: 1,
      image:
        "https://gestion.pe/resizer/JBgEm-SCdKGVQB9ViHxcvg8XgjY=/1200x800/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/H6KJXQXSCRGRLFHK6HLFEPG3YU.jpg",
      unit_price: 550,
      title: "Popcorn",
    },
    {
      stock: 50,
      _id: "6265bf1d767fd0e7f0fdf8a3",
      id: 2,
      image:
        "https://d1tjllbjmslitt.cloudfront.net/spree/products/36375/large/8971600.jpg?1641477356",
      unit_price: 130,
      title: "Bebida",
    },
  ],
  coupon: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        allmovies: action.payload,
        nextmovies: action.payload.filter((el) => el.comingsoon),
      };
    case GET_CATEGORYS:
      return {
        ...state,
        allCategory: action.payload,
        category: action.payload,
      };

    case GET_PRODUCT:
      return {
        ...state,
        products: action.payload,
      };
    case FILTER_CATEGORY:
      if (action.payload == "all") {
        return {
          ...state,
          movies: state.allmovies.filter((el) => !el.comingsoon),
        };
      }

      const allMovies = state.allmovies;
      const createdFilter = allMovies.filter(
        (el) => !el.comingsoon && el.category.includes(action.payload)
      );
      return {
        ...state,
        movies: createdFilter,
      };

    case FILTER_NEXT_MOVIES:
      if (action.payload == "all") {
        return {
          ...state,
          nextmovies: state.allmovies.filter((el) => el.comingsoon),
        };
      }
      const nextMovies = state.allmovies.filter((el) => el.comingsoon);
      const createdFilter1 = nextMovies.filter(
        (el) => el.comingsoon && el.category.includes(action.payload)
      );
      return {
        ...state,
        nextmovies: createdFilter1,
      };
    case GET_MOVIE_DETAIL:
      return {
        ...state,
        movieDetail: action.payload,
      };
    case ADD_TO_CART:
      let newItem = state.products.find(
        (product) => product.id === action.payload
      );
      let itemInCart = state.cart.find((item) => item.id === newItem.id);

      //si ya encuentra un item repetido en el carrito, lo devuelve pero con su prop cantidad+1, sino devuelve el otro con su prop cantidad en 1

      return itemInCart
        ? {
            ...state,
            cart: [
              ...state.cart.map((item) =>
                item.id === newItem.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            ],
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity: 1 }],
          };

    case REMOVE_ONE_FROM_CART:
      let itemToDelete = state.cart.find((item) => item.id === action.payload);
      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    case REMOVE_ALL_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    case GET_MOVIE_NAME:
      return {
        ...state,
        movies: action.payload,
        nextmovies: action.payload,
      };
    case LOGIN:
      return {
        ...state,
        login: true,
        userInfo: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        login: false,
        userInfo: {},
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        movieDetail: [],
      };

    case CREATE_ROOMS:
      return {
        ...state,
      };

    case GET_SALA:
      return {
        ...state,
        room: action.payload,
      };
    //-----------------------------------------esto pal detalle del selectticket
    case SET_FUNCTION:
      let newFuncion = [...new Set(action.payload.occupied_seats)];

      return {
        ...state,
        functionDetail: {
          ...state.functionDetail,
          funcion: { ...action.payload, occupied_seats: newFuncion },
        },
      };
    case GET_ROOM:
      return {
        ...state,
        functionDetail: { ...state.functionDetail, room: action.payload },
      };
    case GET_DETAIL:
      return {
        ...state,
        functionDetail: { ...state.functionDetail, movie: action.payload[0] },
      };
    case "UNSET_FUNCTION":
      return {
        ...state,
        functionDetail: {},
      };
    // -----------------------------------------------------------------------
    case FILLED_SEATS:
      return {
        ...state,
        filledSeats: action.payload,
      };
    case SET_SALAS:
      return {
        ...state,
        room: action.payload,
      };

    case FILL_CHECKOUT:
      return {
        ...state,
        checkout: action.payload,
      };
    case CLEAR_CHECKOUT:
      return {
        ...state,
        checkout: {},
      };
    case FILL_LOCAL_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case FILL_LOCAL_TICKETS:
      return {
        ...state,
        selectedTickets: action.payload.filter((el) => el.quantity !== 0),
      };
    case GET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case GET_FUNCTIONS:
      return {
        ...state,
        functions: action.payload,
      };

    case SET_SEATS:
      return {
        ...state,
      };

    case CREATE_USER:
      return {
        ...state,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case EDIT_USER:
      return {
        ...state,
      };
    case POST_COMMENT:
      return {
        ...state,
      };

    case DELETE_COMMENT:
      return {
        ...state,
      };

    case TICKET_HANDLER:
      return {
        ...state,
        cart: [
          ...state.cart,
          ...action.payload.filter((el) => el.quantity !== 0),
        ],
      };
    case SELECTED_TICKET:
      return {
        ...state,
        selectedTickets: action.payload.filter((el) => el.quantity !== 0),
      };

    case GET_FUNCTION:
      return {
        ...state,
        functions: [action.payload],
      };
    case LOCAL_STORAGE_FUNCTION:
      return {
        ...state,
        functionDetail: action.payload,
      };
    case CLEAR_FUNCTION_DETAIL:
      return {
        ...state,
        functionDetail: [],
      };
    case DISCOUNT_FUNCTION:
      return {
        ...state,
        coupon: action.payload,
      };
    default:
      return state;
  }
};
