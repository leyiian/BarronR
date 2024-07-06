import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Especialidad from "./components/Especialidad";
import Registro from "./components/Registro";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Navigation from "./layouts/Navigation";

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login}></Route>
          <Route path="/registro" Component={Registro}></Route>
        </Routes>
        <Navigation />
        <Routes>
          <Route path="/home" Component={Home}></Route>
          <Route path="/especialidad/:id?" Component={Especialidad}></Route>
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
