import React from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";
import { Link } from "react-router-dom";
import { Button, Container, Content, ErrorContent } from "./Error404Styles";

const Error404 = () => {
  return (
    <Container>
      <Header />
      <Content>
        <ErrorContent>
          <img src="/images/Warning.png" alt="" />
          <p>404 error: page not found</p>
          <h2>Sorry, the page you requested does not exist</h2>
          <h3>You'll be automatically forwarded to the homepage</h3>
          <Link to={"/home"}>
            <Button>go to homepage</Button>
          </Link>
        </ErrorContent>
      </Content>
      <Footer />
    </Container>
  );
};

export default Error404;
