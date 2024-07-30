import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Registro from "./components/Registro";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Navigation from "./layouts/Navigation";
import Citas from "./components/Citas";
import 'primeicons/primeicons.css';
import VerCitas from "./components/VerCitas";
import Aviso from "./components/Aviso";
import SobreNosotros from "./components/SobreNosotros"; 

function App() {
  return (
    <PrimeReactProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<Home />} />
          <Route path="/nueva_cita" element={<Citas />} />
          <Route path="/ver_citas" element={<VerCitas />} />
          <Route path="/aviso_privacidad" element={<Aviso />} />
          <Route path="/sobre_nosotros" element={<SobreNosotros />} /> 
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  );
}

export default App;
