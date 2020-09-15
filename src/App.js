import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";

import Edit from "./components/Products/Edit";
import List from "./components/Products/List";
import Create from "./components/Products/Create";
import Load from "./components/Products/Load";

function App() {
  return (
  <Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="success" variant="success">
          <Container>
            <Navbar.Brand>
              <Link to={"/"} className="nav-link">
                Product Manager
              </Link>
            </Navbar.Brand>
            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-product"} className="nav-link">
                  Create Product
                </Link>
                <Link to={"/products-listing"} className="nav-link">
                  Products List
                </Link>
              </Nav>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={Load} />
                <Route path="/create-product" component={Create} />
                <Route path="/edit-product/:id" component={Edit} />
                <Route path="/products-listing" component={List} />
                {/* Redirect all 404's to home */}
                <Redirect to='/' />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;
