import React from "react";

import Header from './Components/Home';
import Login2 from "./Components/Login2";
import SignUp from "./Components/Register";
import Bisection from './Components/Bisection';
import FalsePosition from './Components/FalsePosition';
import Onepoint from "./Components/Onepoint";
import Taylor from "./Components/Taylor";
import Newton from "./Components/Newton";
import Secant from "./Components/Secant";
import CramerRule from "./Components/Linear/CramerRule";
import MatrixInversion from "./Components/Linear/MatrixInversion";
import SimpleRegression from "./Components/Regression/SimpleRegression";
import Polynomial from "./Components/Regression/Polynomial";

import { NavDropdown, Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>          
          <Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
           <Container fluid="md">
            <Navbar.Brand href="/">Numerical Method</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <NavDropdown title="Root of Equations" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/Bisection">Bisection</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/FalsePosition">False Position</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/OnePoint">OnePoint iteration</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/Taylor">Taylor Series</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/Newton">Newton Raphson</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/Secant">Secant</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Linear Algebre" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/CramerRule">Cramer Rule</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/MatrixInversion">Matrix Inversion</NavDropdown.Item>                  
                </NavDropdown>
                <NavDropdown title="Regression" id="collasible-nav-dropdown">
                  <NavDropdown.Item as={NavLink} to="/SimpleRegression">Simple Linear</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/Polynomial">Polynomial Linear</NavDropdown.Item>                  
                </NavDropdown>
              </Nav>              
            </Navbar.Collapse>

            <Navbar.Collapse className="justify-content-end">
              <Nav>                
                <Nav.Link href="/LoginPage">Login</Nav.Link>
                <Nav.Link href="/Register">Register</Nav.Link>
                <Nav.Link href="http://localhost:3333/api-docs/" target="_blank">Swagger</Nav.Link>
                <Nav.Link href="https://www.facebook.com/jeerapong.sanpo" target="_blank">Contact Me</Nav.Link>
              </Nav>
            </Navbar.Collapse>
           </Container>
          </Navbar>

          <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/LoginPage" element={<Login2 />} />
            <Route path="/Register" element={<SignUp />} />
            <Route path="/Bisection" element={<Bisection />} />
            <Route path="/FalsePosition" element={<FalsePosition  />} />
            <Route path="/OnePoint" element={<Onepoint  />} />
            <Route path="/Taylor" element={<Taylor  />} />
            <Route path="/Newton" element={<Newton  />} />
            <Route path="/Secant" element={<Secant  />} />
            <Route path="/CramerRule" element={<CramerRule />} />
            <Route path="/MatrixInversion" element={<MatrixInversion />} />
            <Route path="/SimpleRegression" element={<SimpleRegression />} />
            <Route path="/Polynomial" element={<Polynomial />} />            
          </Routes>
          
        </BrowserRouter>
    )
}

export default App