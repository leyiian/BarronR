import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Especialidad from "./components/Especialidad";
import Registro from "./components/Registro";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Login}></Route>
        <Route path="/home" Component={Home}></Route>
        <Route path="/especialidad/:id?" Component={Especialidad}></Route>
        <Route path="/registro" Component={Registro}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
