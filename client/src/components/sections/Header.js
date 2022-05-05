import React, { useState } from "react";
import { Button, Container, Navbar, Title, Welcome } from "./HeaderStyles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserInfo, login, logout } from "../../redux/actions";
import Hamburger from "hamburger-react";

import { IoPersonCircle, IoExit } from "react-icons/io5";
import { useEffect } from "react";
import { FaWindowMinimize } from "react-icons/fa";
const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const stateLogin = useSelector((state) => state.login);

  const stateUser = useSelector((state) => state.userInfo);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user[0]?._id) dispatch(getUserInfo(stateUser?.uid));
  }, [dispatch]);

  const photo = stateUser.photoURL;
  const id = stateUser.uid;
  const [isOpen, setOpen] = useState(false);

  return (
    <Container>
      <Navbar>
        {stateUser.uid !== "iBTnFMon69gCYZkidwg0TFV58gy1" ? (
          <div style={{ width: "72px" }}> </div>
        ) : (
          <Button onClick={() => navigate("/administration")}>Admin</Button>
        )}
        <Title onClick={() => window.location.replace("/home")}>Cineman</Title>

        {stateLogin === false ? (
          <Button onClick={() => navigate("/register1")}>Login</Button>
        ) : (
          <div id="userpanel">
            <img src={user[0]?.image} alt=""></img>
            <div id="displaybutton">
              <ul>
                <li>
                  <Button onClick={() => navigate("/user/" + id)}>
                    <IoPersonCircle></IoPersonCircle>Perfil
                  </Button>
                </li>
                <li>
                  <Button onClick={() => dispatch(logout)}>
                    <IoExit></IoExit>LogOut
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </Navbar>
    </Container>
  );
};

export default Header;
