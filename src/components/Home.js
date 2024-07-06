import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Table from "react-bootstrap/Table";
import { useNavigate, NavLink } from "react-router-dom";
import Config from "../Config";

function Home() {
  const [especialidades, setEspecialidades] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    fnEspecialidad();
  }, []);


  const eliminarEspecialidad = async (id) => {
    try {
      const response = await axios.post(
        `${Config.baseURL}/especialidad/eliminar`,
        {
          id: id,
        }
      );
      console.log(response.data);
      if (response.data === "OK") {
        fnEspecialidad();
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError("Ocurrió un error en el servidor");
      console.error("Ocurrió un error: ", error);
    }
  };

  const fnEspecialidad = async (e) => {
    try {
      const response = await axios.get(
        `${Config.baseURL}/especialidades`
      );
      setEspecialidades(response.data);
    } catch (error) {
      console.error("Ocurrió un error: ", error);
    }
  };
  return (
    <div>

      <Container>
        <h1>Especialidades</h1>
        <Button onClick={() => navigate("/especialidad")} size="sm">
          Nuevo Registro
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>

            {especialidades.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>
                  <Button
                    onClick={() => navigate(`/especialidad/${item.id}`)}
                    variant="primary"
                    size="sm"
                    className="me-2"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => eliminarEspecialidad(item.id)}
                    variant="danger"
                    size="sm"
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default Home;
