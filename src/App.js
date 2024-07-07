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
import Citas from "./components/Citas";
import 'primeicons/primeicons.css';
import Especialidades from "./components/Especialidades";
        

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>

        <Navigation />
        <Routes>
        <Route path="/" Component={Login}></Route>
        <Route path="/registro" Component={Registro}></Route>
          <Route path="/home" Component={Home}></Route>
          <Route path="/especialidades" Component={Especialidades}></Route>
          <Route path="/especialidad/:id?" Component={Especialidad}></Route>
          <Route path="/nueva_cita" Component={Citas}></Route>
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
