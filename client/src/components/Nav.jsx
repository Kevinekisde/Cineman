import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import s from "./Styles/Nav.module.css";
import { login, logout } from "../redux/actions.js";

const Navbar = () => {
  const shoppingCart = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );

  const dispatch = useDispatch();

  const stateLogin = useSelector((state) => state.login);

  const stateUser = useSelector((state) => state.userInfo);

  const navigate = useNavigate();

  return (
    <nav className={s.navbar}>
      <Link className={s.tohome} to="/home">
        <span>CINEMAN</span>
      </Link>

      <div className={s.right}>
        <Link className={s.shoppingcart} to="/shopping">
          {shoppingCart}
        </Link>
        <div className={s.navbar_login_btn}>
          {stateUser.uid === "iBTnFMon69gCYZkidwg0TFV58gy1" ? (
            <button onClick={() => navigate("/admin")}>Panel de admin</button>
          ) : (
            <></>
          )}
          <button onClick={() => navigate("/admin")}>Panel de admin</button>
          {stateLogin ? (
            <>
              <button onClick={() => dispatch(logout)}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <button onClick={() => dispatch(login)}>Ingresar</button>{" "}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
