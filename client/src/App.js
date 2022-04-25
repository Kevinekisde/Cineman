import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGIN } from "./redux/constants.js";

// ---Screens ------

// import Home from "./components/Home(deprecated).jsx";
import HomeStyled from "./components/pages/Home";

// New Routes
import Home from "./components/pages/Home";
import Detail from "./components/pages/Detail";
import Error404 from "./components/pages/Error404";
import SelectTickets from "./components/pages/SelectTickets";
import SelectSeats from "./components/pages/SelectSeats";
import Confectionery from "./components/pages/Confectionery";
import ConfirmPurchase from "./components/pages/ConfirmPurchase";
import SuccessfulPurchase from "./components/pages/SuccessfulPurchase";

// Routes
// import Home from "./components/Home.jsx";

// import Admin from "./components/Admin.jsx";
import MovieDetail from "./components/MovieDetail.jsx";
import NotFound from "./components/NotFound.jsx";
import LandingPage from "./components/pages/LandingPage";
import Ticketing from "./components/Ticketing.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import Register from "./components/Register";
import ButacasAdmin from "./components/ButacasAdmin.jsx";
import ButacasUser from "./components/ButacasUser";
import Player from "./components/Player";
import Paypal from "./components/utils/Paypal";
import Checkout from "./components/pages/Checkout";
import Login from "./components/pages/Login";
import Order from "./components/pages/Order";
import User from "./components/pages/User";
import SuccessPay from "./components/pages/SuccessPay";
import BuyPagination from "./components/BuyPagination";
import Comments from "./components/Comments";
import TicketingNew from "./components/pages/TicketingNew";
import Entradas from "./components/Entradas";

function App() {
  const userInfo = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    let login = localStorage.getItem("user");
    if (login !== null) {
      dispatch({
        type: LOGIN,
        payload: JSON.parse(login),
      });
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/admin"
        element={
          userInfo.uid === "iBTnFMon69gCYZkidwg0TFV58gy1" ? (
            <Admin />
          ) : (
            <Admin />
          )
        }
      />
      <Route path="/home" element={<HomeStyled />} />
      {/* <Route path="/home" element={<Home />} /> */}
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/error" element={<Error404 />} />
      <Route path="*" element={<Error404 />} />
      <Route path="/peliculas/:id" element={<MovieDetail />} />
      <Route path="/selecttickets" element={<SelectTickets />} />
      <Route path="/selectseat" element={<SelectSeats />} />
      <Route path="/confectionery" element={<Confectionery />} />
      <Route path="/confirmpurchase" element={<ConfirmPurchase />} />
      <Route path="/successfulpurchase/" element={<SuccessfulPurchase />} />

      <Route path="/tickets" element={<TicketingNew />} />
      <Route path="/order/:order" element={<Order />} />
      <Route path="/createroom" element={<ButacasAdmin />} />
      <Route path="/selectseats" element={<ButacasUser />} />

      <Route path="/cart" element={<ShoppingCart></ShoppingCart>}></Route>
      <Route path="/Register" element={<Register />} />
      <Route path="/Register1" element={<Login />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/Player" element={<Player />} />
      <Route path="/Paypal" element={<Paypal />} />
      <Route path="/BuyPag" element={<BuyPagination />} />
      <Route path="/Comments" element={<Comments />} />
      <Route path="/successPay" element={<SuccessPay />} />
      <Route path="/entradas" element={<Entradas />} />
    </Routes>
  );
}

export default App;
