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

const App = () => {
  return (
        <div className="App">
            <header className="App-header">
            <h1>LOGO</h1>
            </header>
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
