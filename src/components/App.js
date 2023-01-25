import Login from "./Login";
import {BrowserRouter, Outlet, Route, Routes} from "react-router-dom";
import PasswordReminder from "./PasswordReminder";
import React from "react";
import Register from "./Register";
import PasswordChanger from "./PasswordChanger";
import Registered from "./Registered";
import Logs from "./Logs";
import ItemCreator from "./ItemCreator";
import ItemEditor from "./ItemEditor";
import ItemList from "./ItemList";
import {Container, Nav, Navbar, NavbarBrand, NavLink} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";

const App = () => {
  return (
        <div className="App">
            <Navbar>
                <Container>
                    <NavbarBrand href="/list">
                        Home
                    </NavbarBrand>
                    <NavbarToggle aria-controls="basic-navbar-nav"/>
                    <NavbarCollapse id="basic-navbar-nav">
                        <Nav>
                            <NavLink href="/list">
                                lista przedmiotów
                            </NavLink>
                            <NavLink href="/settings">
                                zmień hasło
                            </NavLink>
                            <NavLink href="/logs">
                                Historia prób zalogowania
                            </NavLink>
                        </Nav>
                    </NavbarCollapse>
                </Container>
            </Navbar>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/reminder" element={<PasswordReminder/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/settings" element={<PasswordChanger/>}/>
                    <Route path="/registered" element={<Registered/>}/>
                    <Route path="/logs" element={<Logs/>}/>
                    <Route path="/item" element={<ItemCreator/>}/>
                    <Route path="/update" element={<ItemEditor/>}/>
                    <Route path="/list" element={<ItemList/>}/>
                </Routes>
            </BrowserRouter>
            <Outlet/>
        </div>
    );
}

export default App;
