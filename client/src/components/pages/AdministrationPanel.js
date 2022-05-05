import React, { useState, useEffect } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import AddMovie from "../organisms/AddMovie";
import AddFunction from "../organisms/AddFunction";
import CreateRoom from "../organisms/CreateRoom";
import DeleteRoom from "../organisms/DeleteRoom";
import EditRoom from "../organisms/EditRoom";
import { Container, Content } from "./AdministrationPanelStyles";
import { useSelector } from "react-redux";

const AdministrationPanel = () => {
  const stateUser = useSelector((state) => state.userInfo);
  const stateLogin = useSelector((state) => state.login);

  useEffect(() => {
    if (
      stateLogin === false ||
      stateUser.uid !== "iBTnFMon69gCYZkidwg0TFV58gy1"
    ) {
      window.location.replace("/error");
    }
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <AddMovie />
        <AddFunction />
        <CreateRoom />
        <DeleteRoom />
        <EditRoom />
      </Content>
      <Footer />
    </Container>
  );
};

export default AdministrationPanel;
